/**
 * Purpose: Supabase client initialization.
 * Responsibility: Provide a configured, typed client for interacting with the Supabase database and Auth services.
 * Future Integrations: Setup Database types generated via Supabase CLI for end-to-end type safety. Add interceptors for error handling or auth token refresh.
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Note: Once the database schema is finalized, run `supabase gen types typescript`
 * and pass the generated types to `createClient<Database>()` to ensure strict typing.
 */
