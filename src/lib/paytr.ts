import crypto from 'node:crypto';

const PRICE_PER_ULTRA_CREDIT_TL = 500;

export interface PayTRTokenRequest {
  merchantOid: string;
  email: string;
  amountKurus: number;
  userName: string;
  userAddress: string;
  userPhone: string;
  userIp: string;
  basket: Array<{ name: string; price: number; qty: number }>;
  okUrl: string;
  failUrl: string;
  testMode?: boolean;
}

export function ultraCreditsToKurus(creditAmount: number): number {
  return creditAmount * PRICE_PER_ULTRA_CREDIT_TL * 100;
}

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set`);
  return v;
}

function buildTokenHash(params: {
  merchantId: string;
  userIp: string;
  merchantOid: string;
  email: string;
  paymentAmount: number;
  userBasketB64: string;
  noInstallment: number;
  maxInstallment: number;
  currency: string;
  testMode: number;
  merchantKey: string;
  merchantSalt: string;
}): string {
  const hashStr =
    params.merchantId +
    params.userIp +
    params.merchantOid +
    params.email +
    params.paymentAmount +
    params.userBasketB64 +
    params.noInstallment +
    params.maxInstallment +
    params.currency +
    params.testMode +
    params.merchantSalt;
  return crypto.createHmac('sha256', params.merchantKey).update(hashStr).digest('base64');
}

export async function createPayTRToken(req: PayTRTokenRequest): Promise<{ token: string }> {
  const merchantId = requireEnv('PAYTR_MERCHANT_ID');
  const merchantKey = requireEnv('PAYTR_MERCHANT_KEY');
  const merchantSalt = requireEnv('PAYTR_MERCHANT_SALT');

  const userBasketB64 = Buffer.from(
    JSON.stringify(req.basket.map((i) => [i.name, i.price.toFixed(2), i.qty]))
  ).toString('base64');

  const testMode = req.testMode ? 1 : 0;
  const noInstallment = 0;
  const maxInstallment = 0;
  const currency = 'TL';

  const paytrToken = buildTokenHash({
    merchantId,
    userIp: req.userIp,
    merchantOid: req.merchantOid,
    email: req.email,
    paymentAmount: req.amountKurus,
    userBasketB64,
    noInstallment,
    maxInstallment,
    currency,
    testMode,
    merchantKey,
    merchantSalt,
  });

  const body = new URLSearchParams({
    merchant_id: merchantId,
    user_ip: req.userIp,
    merchant_oid: req.merchantOid,
    email: req.email,
    payment_amount: String(req.amountKurus),
    paytr_token: paytrToken,
    user_basket: userBasketB64,
    debug_on: '1',
    no_installment: String(noInstallment),
    max_installment: String(maxInstallment),
    user_name: req.userName,
    user_address: req.userAddress,
    user_phone: req.userPhone,
    merchant_ok_url: req.okUrl,
    merchant_fail_url: req.failUrl,
    timeout_limit: '30',
    currency,
    test_mode: String(testMode),
  });

  const res = await fetch('https://www.paytr.com/odeme/api/get-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  const json = (await res.json()) as { status: string; token?: string; reason?: string };
  if (json.status !== 'success' || !json.token) {
    throw new Error(`PayTR token error: ${json.reason ?? 'unknown'}`);
  }
  return { token: json.token };
}

export function verifyCallbackHash(params: {
  merchantOid: string;
  status: string;
  totalAmount: string;
  hash: string;
}): boolean {
  const merchantKey = requireEnv('PAYTR_MERCHANT_KEY');
  const merchantSalt = requireEnv('PAYTR_MERCHANT_SALT');
  const hashStr = params.merchantOid + merchantSalt + params.status + params.totalAmount;
  const expected = crypto.createHmac('sha256', merchantKey).update(hashStr).digest('base64');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(params.hash));
}

export function generateMerchantOid(): string {
  const rand = crypto.randomBytes(6).toString('hex').toUpperCase();
  return `WT${Date.now()}${rand}`;
}

export function iframeUrl(token: string): string {
  return `https://www.paytr.com/odeme/guvenli/${token}`;
}
