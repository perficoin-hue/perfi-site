import type { NextApiRequest, NextApiResponse } from 'next';
import { jsonBody } from '../../../lib/builderApi';
import { starterDraft, validateDraft, type WebsiteDraft } from '../../../lib/websiteBuilder';

const requests = new Map<string, number[]>();
function limited(key: string) {
  const now = Date.now();
  const recent = (requests.get(key) || []).filter((time) => now - time < 60_000);
  if (recent.length >= 5) { requests.set(key, recent); return true; }
  recent.push(now); requests.set(key, recent); return false;
}

export default async function generate(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Method not allowed.' }); }
  const key = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (limited(String(Array.isArray(key) ? key[0] : key))) return res.status(429).json({ error: 'Too many AI requests. Please wait a minute and try again.' });
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'AI generation is not configured yet. Add OPENAI_API_KEY as a server-side environment secret to enable it.' });
  const body = jsonBody(req);
  const prompt = typeof body?.prompt === 'string' ? body.prompt.trim().slice(0, 4000) : '';
  if (prompt.length < 12) return res.status(400).json({ error: 'Describe your website in at least 12 characters.' });
  const current = body?.draft ? validateDraft(body.draft) : null;
  const edit = typeof body?.edit === 'string' ? body.edit.trim().slice(0, 1000) : '';
  if (body?.draft && !current) return res.status(400).json({ error: 'The current website draft is invalid.' });
  const base: WebsiteDraft = current || starterDraft(typeof body?.category === 'string' ? body.category.slice(0, 80) : 'Business', typeof body?.name === 'string' ? body.name.slice(0, 100) : 'Your new website');
  const system = 'You create editable website content data, never source code. Return only valid JSON with keys name,businessName,category,description,style,layout,primaryColor,accentColor,font,pages. pages is an array of 1-8 objects {id,title,sections}; each section is {id,type,title,body,buttonText,image?}. Make polished, realistic copy and a responsive-friendly section plan. Do not include HTML, scripts, JSX, CSS, URLs, or executable code. Use only #RRGGBB colors and choose font exactly from Inter, Arial, sans-serif; Georgia, serif; Arial, sans-serif; Verdana, sans-serif. Keep each page to at most 10 sections.';
  const instruction = edit ? `Apply this requested edit to the current draft: ${edit}. Original website brief: ${prompt}` : `Create a website draft from this brief: ${prompt}`;
  try {
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.7, response_format: { type: 'json_object' }, messages: [
        { role: 'system', content: system },
        { role: 'user', content: `${instruction}\nProject settings: ${JSON.stringify({ ...base, logo: '' })}\nReturn a complete website draft as JSON.` },
      ] }),
    });
    if (!upstream.ok) {
      const status = upstream.status;
      return res.status(status === 429 ? 429 : 502).json({ error: status === 401 ? 'The configured AI provider key was rejected.' : 'The AI provider could not generate a draft. Please try again.' });
    }
    const data = await upstream.json();
    const content = data?.choices?.[0]?.message?.content;
    const draft = validateDraft(typeof content === 'string' ? JSON.parse(content) : null);
    if (!draft) return res.status(502).json({ error: 'The AI returned an invalid draft. Please try again.' });
    draft.logo = base.logo;
    return res.status(200).json({ draft });
  } catch {
    return res.status(502).json({ error: 'Unable to reach the AI provider. Please try again shortly.' });
  }
}
