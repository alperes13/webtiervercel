-- Migration 006: Admin Panel Tables

-- 1. Admin flag on users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 2. App settings key-value store
CREATE TABLE IF NOT EXISTS app_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO app_settings (key, value) VALUES
  ('maintenance_mode', 'false'),
  ('cro_mini_enabled', 'true'),
  ('cro_ultra_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

-- 3. Jira-like tasks
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

CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);

-- 4. User documents (URL-based, no binary storage)
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

CREATE INDEX IF NOT EXISTS idx_user_documents_user_id ON user_documents(user_id);

-- To add an admin user, run:
-- UPDATE users SET is_admin = TRUE WHERE email = 'your-admin@email.com';
