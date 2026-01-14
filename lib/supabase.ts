import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fexamlfuwtsdbymscpfv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZleGFtbGZ1d3RzZGJ5bXNjcGZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxODM3NDYsImV4cCI6MjA4MTc1OTc0Nn0.6kRjHd0cNGErSbnn59EsV4CCrJwssui_DDaI-Q5iSo4';

// Debug: Log environment variable status (remove in production)
if (import.meta.env.DEV) {
  console.log('🔍 Supabase Config Check:', {
    hasUrl: !!import.meta.env.VITE_SUPABASE_URL,
    hasKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY,
    keyLength: import.meta.env.VITE_SUPABASE_ANON_KEY?.length || 0,
    isConfigured: supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
  });
}

export const isSupabaseConfigured = supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY';

if (!isSupabaseConfigured) {
  console.warn('⚠️  Supabase not configured. Falling back to localStorage-based authentication.');
  console.warn('💡 Tip: Restart your dev server after creating/updating .env file');
} else {
  console.log('✅ Supabase configured successfully');
}

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

