# Job Hunt Tracker

A full-stack job application tracking app built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Track 15 Job Applications** - Pre-loaded with companies including Stripe, Block, PayPal, and more
- **Edit Cover Letters** - Inline editing for all cover letters
- **Status Management** - Track applications as Pending, Approved, or Submitted
- **Stats Dashboard** - Overview of total, pending, approved, and submitted applications
- **Filter by Status** - Quickly view applications by their current status
- **Discord Notifications** - Automatic Discord messages when you approve an application
- **Responsive Design** - Beautiful UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **API**: Next.js API Routes
- **Deployment**: Netlify (Frontend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Discord webhook URL (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hanishabsigh/job-hunt-app.git
cd job-hunt-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DISCORD_WEBHOOK_URL=your_discord_webhook_url
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Setup

### Create the `jobs` Table

```sql
CREATE TABLE jobs (
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

CREATE INDEX idx_jobs_status ON jobs(status);
```

## API Routes

- `GET/POST /api/jobs` - Fetch all jobs or initialize jobs
- `PATCH /api/jobs/[id]` - Update a job's cover letter
- `POST /api/jobs/[id]/approve` - Approve a job and send Discord notification

## Deployment

### Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Set up environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

## Job Data

The app comes pre-populated with 15 companies:

1. Stripe - Senior Software Engineer
2. Block - Staff Engineer
3. PayPal - Principal Engineer
4. Toast - Engineering Manager
5. Carta - Backend Engineer
6. Google - Software Engineer
7. Affirm - Senior Backend Engineer
8. Shopify - Infrastructure Engineer
9. TPG - Technology Associate
10. Airbnb - Senior Software Engineer
11. Amazon - Senior Software Development Engineer
12. Betterment - Engineering Lead
13. Klarna - Backend Engineer
14. Plaid - Infrastructure Engineer
15. DoorDash - Senior Software Engineer

## License

MIT
