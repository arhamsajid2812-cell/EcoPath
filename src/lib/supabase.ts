import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Strict validation to prevent createClient crashes from malformed strings
const isValidUrl = supabaseUrl.startsWith('http://') || supabaseUrl.startsWith('https://');
export const isDemoConfig = supabaseUrl.includes('placeholder') || supabaseUrl.includes('your_');

export const hasSupabaseConfig = Boolean(isValidUrl && supabaseAnonKey);

if (!hasSupabaseConfig) {
  console.warn("Supabase not configured or invalid URL. Authentication features will be disabled.");
}

/**
 * Global Supabase Client
 * Note: If env variables are missing, we pass dummy values to prevent initialization crashes,
 * but API calls will fail. Check `hasSupabaseConfig` before making calls.
 */
export const supabase = 
  hasSupabaseConfig && supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Helper to get the current user session securely.
 */
export async function getSession() {
  if (!hasSupabaseConfig) return null;
  
  try {
    if (!supabase) return null;
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Auth Session Error:", error);
      return null;
    }
    return session;
  } catch (error) {
    console.warn("Could not retrieve session (likely due to missing credentials):", error);
    return null;
  }
}
