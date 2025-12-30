import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fexamlfuwtsdbymscpfv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const isSupabaseConfigured = supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

if (!isSupabaseConfigured) {
  console.warn('⚠️  Supabase not configured. Falling back to localStorage-based authentication.');
}

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

