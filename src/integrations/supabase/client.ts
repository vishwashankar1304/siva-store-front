
// Updated Supabase client to properly persist sessions and enable auto-refresh
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fojopvemgenlrebevydz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvam9wdmVtZ2VubHJlYmV2eWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzODc4OTQsImV4cCI6MjA2MDk2Mzg5NH0.BHhyRDHv0zyw_IALh94EfC06g2c-5Jlsav2MLtv7V1M";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
