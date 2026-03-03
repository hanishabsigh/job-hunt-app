import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Job = {
  id: string;
  company: string;
  role: string;
  salary: string;
  url: string;
  cover_letter: string;
  status: 'pending' | 'approved' | 'submitted';
  created_at: string;
  updated_at: string;
};
