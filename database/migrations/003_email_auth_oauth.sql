-- ============================================
-- Migration 003: Email Auth + Google OAuth
-- ============================================
-- Switches from phone-based auth to email-based auth.
-- Adds Google OAuth support.
-- Reduces new user mini credit from 2 to 1.
-- ============================================

-- Make phone columns nullable (backward compatible for existing phone users)
ALTER TABLE users ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE users ALTER COLUMN phone_raw DROP NOT NULL;
ALTER TABLE users DROP CONSTRAINT IF EXISTS check_phone_format;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_phone_key;

-- Drop the old non-partial unique index on phone if it exists
DROP INDEX IF EXISTS idx_users_phone;

-- Add partial unique index on email (only enforces uniqueness when email IS NOT NULL)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email) WHERE email IS NOT NULL;

-- Add OAuth columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR(50) DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE DEFAULT NULL;

-- Index for fast Google ID lookups
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- Change default mini credits for new signups from 2 to 1
-- (Only affects future INSERTs; existing user balances are unchanged)
ALTER TABLE users ALTER COLUMN mini_credits SET DEFAULT 1;
