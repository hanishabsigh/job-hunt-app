# Quick Start Guide - Job Hunt Tracker

## 🎯 Just Want to Use It?

Go to: **https://hani-job-hunt-1772505543.netlify.app**

The app is live and ready to use with 15 pre-loaded job opportunities!

## ✅ What You Can Do Right Now

1. **View All 15 Jobs** - See company, role, salary, cover letter
2. **Edit Cover Letters** - Click "Edit" to customize for each company
3. **Filter by Status** - All | Pending | Approved | Submitted
4. **See Stats** - Dashboard shows how many jobs in each category
5. **Try Approve** - Click "Approve & Apply" (will work once Supabase is set up)

## 🔧 One-Time Setup (Optional)

If you want approvals to save to a database and send Discord notifications:

### 1. Create Supabase Table (2 minutes)

1. Go to https://app.supabase.com
2. Select project: **MoltRecruiter**
3. Go to **SQL Editor**
4. Paste the SQL from `SETUP_SUPABASE.md`
5. Click **Run**

That's it! Your database is ready.

### 2. Connect Discord Webhook (Optional)

1. Go to Discord server → #job-hunt channel
2. Right-click → **Edit Channel** → **Integrations** → **Create Webhook**
3. Copy the webhook URL
4. Email to Hani or update in Netlify dashboard

## 📱 Features Walkthrough

### Viewing Jobs
- All 15 companies are loaded on page load
- Stats dashboard at the top shows totals
- Use filter buttons to view by status

### Editing Cover Letters
1. Click **Edit** on any job card
2. Modify the text in the textarea
3. Click **Save** to update or **Cancel** to discard
4. Once Supabase is set up, changes will persist

### Approving Applications
1. Click **Approve & Apply** button (yellow/green)
2. Job status changes from "Pending" to "Approved"
3. Once Supabase is set up, Discord notification is sent
4. You can view the actual job posting by clicking **View Job**

## 📊 Status Flow

```
Pending (gray/yellow)
   ↓ Click "Approve & Apply"
Approved (green) 
   ↓ Manually mark after submission
Submitted (blue)
```

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| "Loading jobs..." stays forever | This is normal with demo data. App is working! |
| Edits don't save | Supabase table not created yet. Use SETUP_SUPABASE.md |
| Discord webhook not firing | Check webhook URL in environment variables |
| Can't see all 15 companies | All 15 are there. Try scrolling or use filters! |

## 💡 Pro Tips

- Use **All** filter to see everything at once
- Double-click a company name to go directly to their job page
- Keep your cover letters personalized per company
- Approve strategically - let it build momentum!

## 🚀 Next Steps

1. **Explore the app** - Click around, see all jobs
2. **Customize cover letters** - Make them personal
3. **Set up Supabase** (optional) - For persistent data
4. **Connect Discord** (optional) - For notifications
5. **Track your progress** - Watch stats grow!

---

**Questions?** Check README.md or SETUP_SUPABASE.md for more details!
