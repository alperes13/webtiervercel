import { query, queryOne } from '@/lib/db';
import { verifyCallbackHash } from '@/lib/paytr';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const form = await request.formData();
  const merchantOid = String(form.get('merchant_oid') ?? '');
  const status = String(form.get('status') ?? '');
  const totalAmount = String(form.get('total_amount') ?? '');
  const hash = String(form.get('hash') ?? '');

  if (!merchantOid || !status || !totalAmount || !hash) {
    return new Response('PAYTR notification failed: missing fields', { status: 400 });
  }

  let ok = false;
  try {
    ok = verifyCallbackHash({ merchantOid, status, totalAmount, hash });
  } catch (err) {
    console.error('[payment/callback] hash verify error', err);
  }

  if (!ok) {
    return new Response('PAYTR notification failed: bad hash', { status: 400 });
  }

  const payment = await queryOne<{ id: string; user_id: string; credit_amount: number; payment_status: string }>(
    'SELECT id, user_id, credit_amount, payment_status FROM payments WHERE merchant_oid = $1',
    [merchantOid]
  );

  if (!payment) return new Response('OK', { status: 200 });
  if (payment.payment_status === 'success') return new Response('OK', { status: 200 });

  const paytrPayload: Record<string, string> = {};
  form.forEach((value, key) => {
    paytrPayload[key] = String(value);
  });

  if (status === 'success') {
    await query(
      `UPDATE payments SET payment_status = 'success', completed_at = NOW(), paytr_response = $2 WHERE id = $1`,
      [payment.id, paytrPayload]
    );
    await query(
      `SELECT add_credit($1, 'ultra', $2, 'purchase', 'PayTR ödeme', $3)`,
      [payment.user_id, payment.credit_amount, payment.id]
    );
  } else {
    await query(
      `UPDATE payments SET payment_status = 'failed', paytr_response = $2 WHERE id = $1`,
      [payment.id, paytrPayload]
    );
  }

  return new Response('OK', { status: 200 });
}
