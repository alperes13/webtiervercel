import { queryOne, query } from '@/lib/db';

function isUndefinedColumnError(err: unknown): boolean {
  return typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === '42703';
}

function isUndefinedTableError(err: unknown): boolean {
  return typeof err === 'object' && err !== null && 'code' in err && (err as { code?: string }).code === '42P01';
}

let ensurePhoneVerifiedColumnPromise: Promise<void> | null = null;

async function ensurePhoneVerifiedColumn(): Promise<void> {
  if (!ensurePhoneVerifiedColumnPromise) {
    ensurePhoneVerifiedColumnPromise = (async () => {
      try {
        await query('ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false');
      } catch (err) {
        // If ALTER permission is missing, we still continue with fallback logic.
        console.warn('[phone-verification] could not ensure users.phone_verified column', err);
      }
    })();
  }

  await ensurePhoneVerifiedColumnPromise;
}

export async function getUserPhoneVerifiedById(userId: string): Promise<boolean> {
  await ensurePhoneVerifiedColumn();

  try {
    const row = await queryOne<{ phone_verified: boolean }>(
      'SELECT COALESCE(phone_verified, false) AS phone_verified FROM users WHERE id = $1',
      [userId]
    );
    return row?.phone_verified ?? false;
  } catch (err) {
    if (!isUndefinedColumnError(err)) throw err;

    const fallback = await queryOne<{ phone_verified: boolean }>(
      `SELECT EXISTS(
         SELECT 1
         FROM otp_sessions os
         JOIN users u ON u.phone = os.phone
         WHERE u.id = $1 AND os.verified = true
       ) AS phone_verified`,
      [userId]
    );
    return fallback?.phone_verified ?? false;
  }
}

export async function getUserPhoneVerifiedByPhone(phone: string): Promise<boolean> {
  await ensurePhoneVerifiedColumn();

  try {
    const row = await queryOne<{ phone_verified: boolean }>(
      'SELECT COALESCE(phone_verified, false) AS phone_verified FROM users WHERE phone = $1',
      [phone]
    );
    return row?.phone_verified ?? false;
  } catch (err) {
    if (!isUndefinedColumnError(err)) throw err;

    const fallback = await queryOne<{ phone_verified: boolean }>(
      'SELECT EXISTS(SELECT 1 FROM otp_sessions WHERE phone = $1 AND verified = true) AS phone_verified',
      [phone]
    );
    return fallback?.phone_verified ?? false;
  }
}

export async function markUserPhoneVerified(phone: string): Promise<void> {
  await ensurePhoneVerifiedColumn();

  try {
    await query('UPDATE users SET phone_verified = true WHERE phone = $1', [phone]);
  } catch (err) {
    if (isUndefinedColumnError(err)) {
      return;
    }
    if (isUndefinedTableError(err)) {
      return;
    }
    throw err;
  }
}
