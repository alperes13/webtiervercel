-- Migration 002: Add persistent phone verification flag
-- Run once on existing databases.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN DEFAULT false;

-- Backfill from metadata if metadata column exists and has phoneVerified.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'users'
      AND column_name = 'metadata'
  ) THEN
    UPDATE users
    SET phone_verified = true
    WHERE LOWER(COALESCE(metadata->>'phoneVerified', 'false')) = 'true';
  END IF;
END
$$;
