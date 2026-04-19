/**
 * Auto-migration: runs idempotent ALTER TABLE statements on first DB connection.
 * Safe to run on every cold start — uses IF NOT EXISTS / DROP IF EXISTS guards.
 */
import { pool } from './db';

let migrated = false;

export async function ensureMigrations(): Promise<void> {
  if (migrated) return;
  migrated = true;

  try {
    await pool.query(`
      -- Migration 003: email auth + oauth columns
      ALTER TABLE users ALTER COLUMN phone DROP NOT NULL;
    `);
  } catch { /* already nullable */ }

  try {
    await pool.query(`ALTER TABLE users ALTER COLUMN phone_raw DROP NOT NULL;`);
  } catch { /* already nullable */ }

  try {
    await pool.query(`ALTER TABLE users DROP CONSTRAINT IF EXISTS check_phone_format;`);
  } catch { /* already dropped */ }

  try {
    await pool.query(`ALTER TABLE users DROP CONSTRAINT IF EXISTS users_phone_key;`);
  } catch { /* already dropped */ }

  try {
    await pool.query(`DROP INDEX IF EXISTS idx_users_phone;`);
  } catch { /* already dropped */ }

  try {
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR(50) DEFAULT NULL;
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) DEFAULT NULL;
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id) WHERE google_id IS NOT NULL;
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email) WHERE email IS NOT NULL;
    `);
  } catch { /* already exists */ }

  // Migration 004: email_verified
  try {
    await pool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`
      UPDATE users SET email_verified = TRUE WHERE google_id IS NOT NULL AND (email_verified IS NULL OR email_verified = FALSE);
    `);
  } catch { /* ignore */ }

  // Migration 005: otp_sessions email support
  try {
    await pool.query(`ALTER TABLE otp_sessions ALTER COLUMN phone DROP NOT NULL;`);
  } catch { /* already nullable or doesn't exist */ }

  try {
    await pool.query(`
      ALTER TABLE otp_sessions ADD COLUMN IF NOT EXISTS email VARCHAR(255);
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_sessions(email);
    `);
  } catch { /* already exists */ }

  console.log('[migrate] ensureMigrations complete');
}
