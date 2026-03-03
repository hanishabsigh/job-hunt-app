# Supabase Setup Instructions

## Quick Start

1. Go to https://app.supabase.com and log in to your account
2. Select the project **MoltRecruiter** (project ID: kftjdcqxsilexifowrux)
3. Go to the SQL Editor (in the left sidebar)
4. Copy and paste the SQL below into the editor
5. Click "Run" to execute

## SQL to Execute

```sql
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

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access
CREATE POLICY IF NOT EXISTS jobs_public_read ON jobs
  FOR SELECT
  USING (true);

CREATE POLICY IF NOT EXISTS jobs_public_insert ON jobs
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS jobs_public_update ON jobs
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
```

## After Table Creation

1. Go to https://hani-job-hunt-1772505543.netlify.app/
2. Click on the page and the app will automatically fetch and display all 15 jobs
3. You can now start editing cover letters and approving applications!

## Supabase Credentials

- **Project ID**: kftjdcqxsilexifowrux
- **Region**: East US
- **URL**: https://kftjdcqxsilexifowrux.supabase.co
- **Anon Key**: (configured in Netlify environment)

## Discord Integration (Optional)

To enable Discord notifications when jobs are approved:

1. Go to your Discord server's #job-hunt channel
2. Create a webhook (Channel Settings → Webhooks → Create Webhook)
3. Copy the webhook URL
4. Add it to Netlify environment variables as `DISCORD_WEBHOOK_URL`

Run from terminal:
```bash
NETLIFY_AUTH_TOKEN=$(security find-generic-password -a "odysseyshabsigh@netlify" -s "openclaw-netlify" -w) \
netlify env:set DISCORD_WEBHOOK_URL "YOUR_WEBHOOK_URL_HERE"
```

## Testing the App

Once the table is created:

1. Visit https://hani-job-hunt-1772505543.netlify.app/
2. You should see 15 pre-populated jobs
3. Click "Edit" on any job to modify the cover letter
4. Click "Approve & Apply" to mark it as approved (Discord notification will be sent)
5. Use filter buttons to view jobs by status
