-- Migration 001: Add password_hash column to users
-- Run once on existing databases. Schema.sql already includes this for fresh installs.

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
