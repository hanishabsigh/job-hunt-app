-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  salary TEXT,
  url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'submitted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

-- Enable RLS
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read
CREATE POLICY IF NOT EXISTS jobs_public_read ON jobs
  FOR SELECT
  USING (true);

-- Create policy to allow public insert (for initialization)
CREATE POLICY IF NOT EXISTS jobs_public_insert ON jobs
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow public update
CREATE POLICY IF NOT EXISTS jobs_public_update ON jobs
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
