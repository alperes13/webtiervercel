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

  // Migration 006: password_reset_tokens
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        token VARCHAR(64) NOT NULL UNIQUE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_prt_token ON password_reset_tokens(token);`);
  } catch { /* already exists */ }

  // Migration 007: user names
  try {
    await pool.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS first_name VARCHAR(100),
      ADD COLUMN IF NOT EXISTS last_name VARCHAR(100);
    `);
  } catch { /* already exists */ }

  // Migration 008: Admin panel tables
  try {
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;`);
  } catch { /* already exists */ }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS app_settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`
      INSERT INTO app_settings (key, value) VALUES
        ('maintenance_mode', 'false'),
        ('cro_mini_enabled', 'true'),
        ('cro_ultra_enabled', 'true')
      ON CONFLICT (key) DO NOTHING;
    `);
  } catch { /* already seeded */ }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        priority VARCHAR(20) DEFAULT 'medium',
        status VARCHAR(50) DEFAULT 'todo',
        labels TEXT[],
        image_url TEXT,
        due_date DATE,
        created_by VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT check_task_priority CHECK (priority IN ('low', 'medium', 'high', 'critical')),
        CONSTRAINT check_task_status CHECK (status IN ('todo', 'in_progress', 'review', 'done', 'cancelled'))
      );
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);`);
  } catch { /* already exists */ }

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_documents (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(20) NOT NULL,
        name VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        file_extension VARCHAR(20),
        added_by VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT check_doc_type CHECK (type IN ('file', 'link'))
      );
    `);
  } catch { /* already exists */ }

  try {
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);`);
  } catch { /* already exists */ }

  console.log('[migrate] ensureMigrations complete');
}
