# Supabase Setup Guide

## Prerequisites
1. Supabase project URL: `https://fexamlfuwtsdbymscpfv.supabase.co`
2. Access to Supabase Dashboard

## Step 1: Get Your Supabase Anon Key

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Copy the **anon/public** key
5. Update `lib/supabase.ts` with your anon key:

```typescript
const supabaseAnonKey = 'your-anon-key-here';
```

## Step 2: Run Database Schema

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy the contents of `supabase/schema.sql`
3. Paste and run the SQL script
4. This will create:
   - `deals` table with proper structure
   - Row Level Security (RLS) policies
   - Indexes for performance

## Step 3: Configure Authentication

1. Go to **Authentication** → **Settings** in Supabase Dashboard
2. Enable **Email** provider (should be enabled by default)
3. Configure email templates if needed
4. Set up email confirmation (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize templates as needed

## Step 4: Test the Setup

1. Start your development server: `npm run dev`
2. Try signing up with a new email
3. Check Supabase Dashboard → **Authentication** → **Users** to see the new user
4. Try saving a deal and check **Table Editor** → **deals** to see the saved data

## Row Level Security (RLS)

The database is configured with RLS policies that ensure:
- Users can only see their own deals
- Users can only create/update/delete their own deals
- All operations are automatically scoped to the authenticated user

## Environment Variables (Optional - for Production)

For production, use environment variables:

1. Create `.env.local` file:
```
VITE_SUPABASE_URL=https://fexamlfuwtsdbymscpfv.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Update `lib/supabase.ts`:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

## Troubleshooting

### Authentication Issues
- Make sure email provider is enabled in Supabase
- Check browser console for error messages
- Verify your anon key is correct

### Database Issues
- Ensure schema.sql has been run successfully
- Check RLS policies are enabled
- Verify user_id matches auth.uid() in queries

### CORS Issues
- Supabase handles CORS automatically
- If issues occur, check Supabase project settings

