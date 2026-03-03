# Job Hunt Tracker 🚀

A full-stack job application tracking app built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Supabase**. Track, edit, and approve your dream job applications with one powerful dashboard.

## ✨ Features

✅ **Track 15 Job Applications** - Pre-loaded with top tech companies  
✅ **Inline Cover Letter Editing** - Edit and save cover letters directly in the app  
✅ **Status Management** - Track applications as Pending → Approved → Submitted  
✅ **Real-time Stats Dashboard** - Overview of total, approved, and submitted applications  
✅ **Smart Filtering** - Filter applications by status in one click  
✅ **Discord Notifications** - Get notified on Discord when you approve an application  
✅ **Beautiful UI** - Responsive dark theme with Tailwind CSS  
✅ **Production-Ready** - TypeScript, error handling, and graceful fallbacks  

## 🎯 Live Demo

**🔗 [https://hani-job-hunt-1772505543.netlify.app](https://hani-job-hunt-1772505543.netlify.app)**

## 📋 Job Companies

1. **Stripe** - Senior Software Engineer ($200K-$240K)
2. **Block** - Staff Engineer ($210K-$250K)
3. **PayPal** - Principal Engineer ($180K-$220K)
4. **Toast** - Engineering Manager ($170K-$210K)
5. **Carta** - Backend Engineer ($160K-$200K)
6. **Google** - Software Engineer ($190K-$230K)
7. **Affirm** - Senior Backend Engineer ($165K-$205K)
8. **Shopify** - Infrastructure Engineer ($175K-$215K)
9. **TPG** - Technology Associate ($150K-$190K)
10. **Airbnb** - Senior Software Engineer ($185K-$225K)
11. **Amazon** - Senior Software Development Engineer ($170K-$210K)
12. **Betterment** - Engineering Lead ($155K-$195K)
13. **Klarna** - Backend Engineer ($160K-$200K)
14. **Plaid** - Infrastructure Engineer ($180K-$220K)
15. **DoorDash** - Senior Software Engineer ($175K-$215K)

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Netlify
- **Notifications**: Discord Webhooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Discord webhook URL (optional)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/hanishabsigh/job-hunt-app.git
cd job-hunt-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env.local`:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://kftjdcqxsilexifowrux.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
```

4. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Supabase Setup

**⚠️ Important:** The app includes demo data fallback. For full functionality with persistent data, follow these steps:

### 1. Create the Database Table

Visit https://app.supabase.com/project/kftjdcqxsilexifowrux/editor and run:

```sql
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

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS jobs_public_read ON jobs
  FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS jobs_public_insert ON jobs
  FOR INSERT WITH CHECK (true);

CREATE POLICY IF NOT EXISTS jobs_public_update ON jobs
  FOR UPDATE USING (true) WITH CHECK (true);
```

### 2. Update Environment Variables

Get your credentials from Supabase Project Settings:
- `NEXT_PUBLIC_SUPABASE_URL` - Your project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anonymous key

## 📡 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/jobs` | GET | Fetch all jobs |
| `/api/jobs` | POST | Initialize jobs from seed data |
| `/api/jobs/[id]` | PATCH | Update job cover letter |
| `/api/jobs/[id]/approve` | POST | Approve job & send Discord notification |

## 🔔 Discord Integration

1. Go to your Discord server's #job-hunt channel
2. Channel Settings → Integrations → Webhooks → New Webhook
3. Copy the webhook URL
4. Add to environment variables as `DISCORD_WEBHOOK_URL`

When you approve a job, you'll get a notification like:
```
✅ Job Application Approved
Company: Stripe
Role: Senior Software Engineer
Salary: $200K-$240K
Status: Approved for Submission
```

## 📦 Deployment

### Deploy to Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy (automatic on push)

**Current Status**: Deployed at https://hani-job-hunt-1772505543.netlify.app

## 📝 Development

### Build for Production
```bash
npm run build
npm run start
```

### TypeScript & Linting
```bash
npm run lint
npm run type-check
```

### Project Structure
```
app/
  ├── page.tsx                    # Main dashboard
  ├── layout.tsx                  # Root layout
  ├── api/
  │   └── jobs/
  │       ├── route.ts            # GET/POST jobs
  │       └── [id]/
  │           ├── route.ts        # PATCH job
  │           └── approve/route.ts # POST approve + Discord
  └── components/
      ├── JobCard.tsx             # Job display & edit
      └── StatsBoard.tsx           # Stats dashboard

lib/
  ├── supabase.ts                 # Supabase client
  └── jobs-data.ts                # 15 job seed data
```

## 🐛 Troubleshooting

### Jobs not loading?
- Ensure Supabase table is created (see SETUP_SUPABASE.md)
- Check environment variables are correct
- The app includes demo data fallback - it will still work!

### Discord notifications not working?
- Verify webhook URL is correct
- Check Discord channel permissions allow webhooks
- Look at deployment logs for errors

### Environment variables not working?
- For local: use `.env.local` file
- For Netlify: set in Netlify dashboard
- Restart dev server after changing `.env.local`

## 📄 License

MIT - Feel free to use this as a template for your own projects!

## 🎓 What I Learned Building This

- ✅ Next.js 14 dynamic routes with async params
- ✅ Supabase RLS (Row Level Security) policies
- ✅ Discord webhook embeds
- ✅ TypeScript component patterns
- ✅ Tailwind responsive design
- ✅ Error handling & graceful fallbacks
- ✅ Netlify deployment & environment management

---

**Built with ❤️ for Hani Shabsigh**
