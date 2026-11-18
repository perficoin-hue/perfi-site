import type { NextApiRequest, NextApiResponse } from 'next';

export default function publish(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Method not allowed.' }); }
  return res.status(503).json({
    error: 'Publishing is not enabled. No deployment was started and your website is not live.',
    setup: ['Configure a Cloudflare Pages project and account.', 'Implement and secure the deployment worker/pipeline and domain provisioning.', 'Add server-side Cloudflare credentials and deployment secrets.', 'Configure the perfi-site.com DNS zone and wildcard subdomain routing.'],
  });
}
