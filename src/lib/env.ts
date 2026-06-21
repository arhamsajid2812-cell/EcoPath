import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required for Vision and Eco Coach AI.").optional(), // Optional for demo mode, but validated if present
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("Must be a valid URL").optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
});

/**
 * Validates environment variables at runtime. 
 * Prevents silent failures by throwing immediately if critical variables are missing/malformed.
 */
export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
