import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function jsonBody(req: NextApiRequest): Record<string, unknown> | null {
  return req.body && typeof req.body === 'object' && !Array.isArray(req.body) ? req.body as Record<string, unknown> : null;
}

export async function authenticatedSupabase(req: NextApiRequest, res: NextApiResponse): Promise<{ client: SupabaseClient; userId: string } | null> {
  const authorization = req.headers.authorization || '';
  const token = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!token || !url || !key) {
    res.status(401).json({ error: 'Sign in and configure Supabase to save websites to your account.' });
    return null;
  }
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { headers: { Authorization: `Bearer ${token}` } } });
  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) {
    res.status(401).json({ error: 'Your session is invalid or expired. Please sign in again.' });
    return null;
  }
  return { client, userId: data.user.id };
}
