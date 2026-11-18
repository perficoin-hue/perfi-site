import type { NextApiRequest, NextApiResponse } from 'next';

export default function publish(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Allow', 'POST');
  return res.status(410).json({ error: 'The website builder is temporarily unavailable while it is being redesigned.' });
}
