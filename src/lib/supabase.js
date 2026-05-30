import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if credentials are configure correctly (i.e., not the placeholder strings)
export const isSupabaseConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  supabaseUrl !== 'https://placeholder-url.supabase.co' &&
  supabaseAnonKey && 
  supabaseAnonKey !== 'your-anon-key-here' && 
  supabaseAnonKey !== 'placeholder-anon-key';

if (!isSupabaseConfigured) {
  console.warn(
    'StudyMate: Supabase URL or Anon Key is missing or using default placeholders. ' +
    'Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file for authentication to work.'
  );
}

// Instantiate the Supabase client.
// If placeholders are present, use fallback strings so createClient does not throw synchronous constructor errors.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder-url-please-configure-env.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key-please-configure-env'
);
