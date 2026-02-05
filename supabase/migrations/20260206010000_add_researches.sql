-- 연구/실험 작업물
CREATE TABLE researches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  github_url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE researches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read researches" ON researches
  FOR SELECT USING (true);

CREATE INDEX idx_researches_created_at ON researches(created_at DESC);
