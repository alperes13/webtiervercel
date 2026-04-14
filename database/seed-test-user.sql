-- ============================================
-- TEST USER SEED
-- ============================================
-- Telefon: 5551112233   (UI'da bu numarayı girin)
-- Şifre:   test1234     (Giriş modalında bu şifreyi girin)
-- Krediler: 5 mini + 2 ultra
-- ============================================

-- password_hash kolonu yoksa önce migration'u çalıştırın:
--   psql $POSTGRES_URL < database/migrations/001_add_password_hash.sql

-- Test kullanıcıyı oluştur veya güncelle
INSERT INTO users (phone, phone_raw, password_hash, mini_credits, ultra_credits, last_login)
VALUES (
  '+905551112233',
  '5551112233',
  '$2b$10$JFIDUt3yUiWm127MyT2Uae57c59B8gs87tNl3QTcYZ39fzM6lE/7u',  -- bcrypt('test1234')
  5,
  2,
  CURRENT_TIMESTAMP
)
ON CONFLICT (phone) DO UPDATE
  SET password_hash = EXCLUDED.password_hash,
      mini_credits = 5,
      ultra_credits = 2,
      is_active = true;

-- Signup bonus transaction (eğer bu kullanıcı için henüz yoksa)
INSERT INTO credits (user_id, credit_type, amount, transaction_type, description, balance_after)
SELECT u.id, 'mini', 5, 'signup_bonus', 'Test user seed', 5
FROM users u
WHERE u.phone = '+905551112233'
  AND NOT EXISTS (
    SELECT 1 FROM credits c
    WHERE c.user_id = u.id AND c.transaction_type = 'signup_bonus' AND c.credit_type = 'mini'
  );

INSERT INTO credits (user_id, credit_type, amount, transaction_type, description, balance_after)
SELECT u.id, 'ultra', 2, 'signup_bonus', 'Test user seed', 2
FROM users u
WHERE u.phone = '+905551112233'
  AND NOT EXISTS (
    SELECT 1 FROM credits c
    WHERE c.user_id = u.id AND c.transaction_type = 'signup_bonus' AND c.credit_type = 'ultra'
  );

-- Doğrulama
SELECT phone, mini_credits, ultra_credits,
       CASE WHEN password_hash IS NULL THEN 'NO PASSWORD' ELSE 'HAS PASSWORD' END AS pwd_status
FROM users
WHERE phone = '+905551112233';
