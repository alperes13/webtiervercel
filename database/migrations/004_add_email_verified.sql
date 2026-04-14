-- ============================================
-- Migration 004: Add Email Verification
-- ============================================
-- Adds email_verified column to track user verification status.
-- ============================================

ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;

-- Update existing users to be verified if they have a google_id (OAuth users are usually pre-verified)
UPDATE users SET email_verified = TRUE WHERE google_id IS NOT NULL;
