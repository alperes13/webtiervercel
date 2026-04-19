-- ============================================
-- WEBTIER PostgreSQL Database Schema
-- ============================================
-- Version: 1.0
-- Created for: Vercel Postgres / Supabase
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(20),
    phone_raw VARCHAR(20),
    email VARCHAR(255),
    password_hash VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,

    -- Kredi bilgileri
    mini_credits INTEGER DEFAULT 1,
    ultra_credits INTEGER DEFAULT 0,

    -- OAuth
    oauth_provider VARCHAR(50) DEFAULT NULL,
    google_id VARCHAR(255) UNIQUE DEFAULT NULL,

    -- Email verification
    email_verified BOOLEAN DEFAULT FALSE,

    -- Metadata
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE UNIQUE INDEX idx_users_email_unique ON users(email) WHERE email IS NOT NULL;
CREATE INDEX idx_users_google_id ON users(google_id);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- ============================================
-- OTP SESSIONS TABLE
-- ============================================
CREATE TABLE otp_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(20),
    email VARCHAR(255),
    otp_code VARCHAR(6) NOT NULL,
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    verified BOOLEAN DEFAULT false,
    verified_at TIMESTAMP WITH TIME ZONE,
    ip_address VARCHAR(50),

    CONSTRAINT check_otp_format CHECK (otp_code ~ '^[0-9]{6}$')
);

-- Index for faster OTP lookups
CREATE INDEX idx_otp_phone ON otp_sessions(phone);
CREATE INDEX idx_otp_email ON otp_sessions(email);
CREATE INDEX idx_otp_expires ON otp_sessions(expires_at);
CREATE INDEX idx_otp_verified ON otp_sessions(verified);

-- Auto-delete expired OTP sessions (cleanup)
CREATE OR REPLACE FUNCTION delete_expired_otp_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM otp_sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- CREDITS TABLE (Transaction Log)
-- ============================================
CREATE TABLE credits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    credit_type VARCHAR(20) NOT NULL, -- 'mini' or 'ultra'
    amount INTEGER NOT NULL, -- Positive for add, negative for deduct
    transaction_type VARCHAR(50) NOT NULL, -- 'signup_bonus', 'purchase', 'analysis_used', 'refund'
    description TEXT,
    balance_after INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- İlgili analiz veya ödeme
    analysis_id UUID,
    payment_id UUID,
    
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT check_credit_type CHECK (credit_type IN ('mini', 'ultra'))
);

-- Indexes
CREATE INDEX idx_credits_user_id ON credits(user_id);
CREATE INDEX idx_credits_created_at ON credits(created_at DESC);
CREATE INDEX idx_credits_type ON credits(credit_type);

-- ============================================
-- ANALYSES TABLE
-- ============================================
CREATE TABLE analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    analysis_type VARCHAR(20) NOT NULL, -- 'mini' or 'ultra'
    
    -- Input data
    website_url TEXT NOT NULL,
    instagram_url TEXT,
    linkedin_url TEXT,
    tiktok_url TEXT,
    additional_notes TEXT,
    
    -- Status
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed', 'rejected'
    
    -- Sonuçlar
    results JSONB,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Admin review (Ultra için)
    reviewed_by VARCHAR(255),
    review_notes TEXT,
    approved BOOLEAN,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    
    -- Refund durumu (Ultra rejected ise kredi iadesi)
    refunded BOOLEAN DEFAULT false,
    refund_id UUID,
    
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT check_analysis_type CHECK (analysis_type IN ('mini', 'ultra')),
    CONSTRAINT check_status CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'rejected'))
);

-- Indexes
CREATE INDEX idx_analyses_user_id ON analyses(user_id);
CREATE INDEX idx_analyses_status ON analyses(status);
CREATE INDEX idx_analyses_type ON analyses(analysis_type);
CREATE INDEX idx_analyses_created_at ON analyses(created_at DESC);

-- ============================================
-- PAYMENTS TABLE
-- ============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Ödeme detayları
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'TRY',
    credit_type VARCHAR(20) NOT NULL, -- 'ultra'
    credit_amount INTEGER NOT NULL, -- Kaç kredi satın alındı
    
    -- PayTR fields
    merchant_oid VARCHAR(255) UNIQUE, -- PayTR merchant order ID
    payment_token VARCHAR(255), -- PayTR iframe token
    payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'success', 'failed', 'refunded'
    
    -- Response data
    paytr_response JSONB,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT check_payment_status CHECK (payment_status IN ('pending', 'success', 'failed', 'refunded'))
);

-- Indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);

-- ============================================
-- TRIGGERS
-- ============================================

-- Update timestamp on analyses
CREATE OR REPLACE FUNCTION update_analyses_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_analyses_update
BEFORE UPDATE ON analyses
FOR EACH ROW
EXECUTE FUNCTION update_analyses_timestamp();

-- Update timestamp on payments
CREATE OR REPLACE FUNCTION update_payments_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_payments_update
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION update_payments_timestamp();

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Get user credit balance
CREATE OR REPLACE FUNCTION get_user_credits(p_user_id UUID)
RETURNS TABLE(mini_credits INTEGER, ultra_credits INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT u.mini_credits, u.ultra_credits
    FROM users u
    WHERE u.id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Deduct credit (with balance check)
CREATE OR REPLACE FUNCTION deduct_credit(
    p_user_id UUID,
    p_credit_type VARCHAR,
    p_analysis_id UUID,
    p_description TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    current_balance INTEGER;
    new_balance INTEGER;
BEGIN
    -- Get current balance
    IF p_credit_type = 'mini' THEN
        SELECT mini_credits INTO current_balance FROM users WHERE id = p_user_id;
    ELSE
        SELECT ultra_credits INTO current_balance FROM users WHERE id = p_user_id;
    END IF;
    
    -- Check if enough balance
    IF current_balance < 1 THEN
        RETURN FALSE;
    END IF;
    
    -- Deduct credit
    new_balance := current_balance - 1;
    
    IF p_credit_type = 'mini' THEN
        UPDATE users SET mini_credits = new_balance WHERE id = p_user_id;
    ELSE
        UPDATE users SET ultra_credits = new_balance WHERE id = p_user_id;
    END IF;
    
    -- Log transaction
    INSERT INTO credits (
        user_id,
        credit_type,
        amount,
        transaction_type,
        description,
        balance_after,
        analysis_id
    ) VALUES (
        p_user_id,
        p_credit_type,
        -1,
        'analysis_used',
        p_description,
        new_balance,
        p_analysis_id
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Add credit (for purchases or refunds)
CREATE OR REPLACE FUNCTION add_credit(
    p_user_id UUID,
    p_credit_type VARCHAR,
    p_amount INTEGER,
    p_transaction_type VARCHAR,
    p_description TEXT DEFAULT NULL,
    p_payment_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    current_balance INTEGER;
    new_balance INTEGER;
BEGIN
    -- Get current balance
    IF p_credit_type = 'mini' THEN
        SELECT mini_credits INTO current_balance FROM users WHERE id = p_user_id;
    ELSE
        SELECT ultra_credits INTO current_balance FROM users WHERE id = p_user_id;
    END IF;
    
    -- Add credit
    new_balance := current_balance + p_amount;
    
    IF p_credit_type = 'mini' THEN
        UPDATE users SET mini_credits = new_balance WHERE id = p_user_id;
    ELSE
        UPDATE users SET ultra_credits = new_balance WHERE id = p_user_id;
    END IF;
    
    -- Log transaction
    INSERT INTO credits (
        user_id,
        credit_type,
        amount,
        transaction_type,
        description,
        balance_after,
        payment_id
    ) VALUES (
        p_user_id,
        p_credit_type,
        p_amount,
        p_transaction_type,
        p_description,
        new_balance,
        p_payment_id
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- SEED DATA (for testing)
-- ============================================

-- Insert test user (optional - remove in production)
-- INSERT INTO users (phone, phone_raw, email, mini_credits, ultra_credits)
-- VALUES ('+905551234567', '5551234567', 'test@webtier.com', 2, 1);

-- ============================================
-- NOTES
-- ============================================
-- 1. Run this schema on Vercel Postgres or Supabase
-- 2. Set up environment variables in Vercel:
--    - POSTGRES_URL
--    - POSTGRES_PRISMA_URL  
--    - POSTGRES_URL_NON_POOLING
-- 3. For PayTR integration:
--    - PAYTR_MERCHANT_ID
--    - PAYTR_MERCHANT_KEY
--    - PAYTR_MERCHANT_SALT
-- 4. For WhatsApp:
--    - WHATSAPP_API_URL
--    - WHATSAPP_API_TOKEN
-- ============================================
