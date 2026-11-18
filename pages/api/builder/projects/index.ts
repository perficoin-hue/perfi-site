import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticatedSupabase, jsonBody } from '../../../lib/builderApi';
import { validateDraft } from '../../../lib/websiteBuilder';

export default async function projects(req: NextApiRequest, res: NextApiResponse) {
  const auth = await authenticatedSupabase(req, res);
  if (!auth) return;
  if (req.method === 'GET') {
    const { data, error } = await auth.client.from('website_projects').select('id,name,status,draft,updated_at').order('updated_at', { ascending: false }).limit(50);
    if (error) return res.status(500).json({ error: 'Could not load projects. Check the website builder database migration and RLS policies.' });
    return res.status(200).json({ projects: data || [] });
  }
  if (req.method === 'POST') {
    const body = jsonBody(req);
    const draft = validateDraft(body?.draft);
    if (!draft) return res.status(400).json({ error: 'Website draft is invalid.' });
    const { data, error } = await auth.client.from('website_projects').insert({ owner_id: auth.userId, name: draft.name, draft, status: 'draft' }).select('id,name,status,draft,updated_at').single();
    if (error) return res.status(500).json({ error: 'Could not save your website. Check the database setup and project policies.' });
    return res.status(201).json({ project: data });
  }
  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Method not allowed.' });
}
