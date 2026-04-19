-- ============================================
-- Migration 005: Sync Schema
-- ============================================
-- Ensures all columns from migrations 001-004 exist.
-- Adds email column to otp_sessions for email OTP verification.
-- Safe to run multiple times (idempotent).
-- ============================================

-- Make phone columns nullable
ALTER TABLE users ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE users ALTER COLUMN phone_raw DROP NOT NULL;
ALTER TABLE users DROP CONSTRAINT IF EXISTS check_phone_format;
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_phone_key;

-- Drop old non-partial unique index on phone if exists
DROP INDEX IF EXISTS idx_users_phone;

-- Add OAuth columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS oauth_provider VARCHAR(50) DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE DEFAULT NULL;
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- Add email_verified column
ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;

-- Create partial unique index on email
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique ON users(email) WHERE email IS NOT NULL;

-- Set default mini credits to 1 for new signups
ALTER TABLE users ALTER COLUMN mini_credits SET DEFAULT 1;

-- Mark OAuth users as email-verified
UPDATE users SET email_verified = TRUE WHERE google_id IS NOT NULL AND email_verified = FALSE;

-- Add email column to otp_sessions for email OTP
ALTER TABLE otp_sessions ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE otp_sessions ALTER COLUMN phone DROP NOT NULL;
CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_sessions(email);
