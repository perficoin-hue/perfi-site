import type { NextApiRequest, NextApiResponse } from 'next';
import { authenticatedSupabase, jsonBody } from '../../../../lib/builderApi';
import { validateDraft } from '../../../../lib/websiteBuilder';

export default async function project(req: NextApiRequest, res: NextApiResponse) {
  const auth = await authenticatedSupabase(req, res);
  if (!auth) return;
  const id = typeof req.query.id === 'string' ? req.query.id : '';
  if (!/^[0-9a-f-]{36}$/i.test(id)) return res.status(400).json({ error: 'Invalid project ID.' });
  if (req.method === 'GET') {
    const { data, error } = await auth.client.from('website_projects').select('id,name,status,draft,updated_at').eq('id', id).eq('owner_id', auth.userId).maybeSingle();
    if (error) return res.status(500).json({ error: 'Could not load this website.' });
    if (!data) return res.status(404).json({ error: 'Website not found.' });
    return res.status(200).json({ project: data });
  }
  if (req.method === 'PUT') {
    const body = jsonBody(req);
    const draft = validateDraft(body?.draft);
    if (!draft) return res.status(400).json({ error: 'Website draft is invalid.' });
    const { data, error } = await auth.client.from('website_projects').update({ name: draft.name, draft, updated_at: new Date().toISOString() }).eq('id', id).eq('owner_id', auth.userId).select('id,name,status,draft,updated_at').maybeSingle();
    if (error) return res.status(500).json({ error: 'Could not save your changes.' });
    if (!data) return res.status(404).json({ error: 'Website not found.' });
    return res.status(200).json({ project: data });
  }
  if (req.method === 'DELETE') {
    const { data, error } = await auth.client.from('website_projects').delete().eq('id', id).eq('owner_id', auth.userId).select('id').maybeSingle();
    if (error) return res.status(500).json({ error: 'Could not delete this website.' });
    if (!data) return res.status(404).json({ error: 'Website not found.' });
    return res.status(200).json({ deleted: true });
  }
  res.setHeader('Allow', 'GET, PUT, DELETE');
  return res.status(405).json({ error: 'Method not allowed.' });
}
