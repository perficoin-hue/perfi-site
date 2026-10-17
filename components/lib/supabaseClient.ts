import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    // Don't throw during module initialization (prevents build failures when env vars
    // are not injected into the build environment). Callers should handle `null`.
    return null;
  }

  supabase = createClient(url, key);
  return supabase;
}
