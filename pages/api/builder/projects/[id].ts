import type { NextApiRequest, NextApiResponse } from 'next';

export default function project(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Allow', 'GET, PUT, DELETE');
  return res.status(410).json({ error: 'The website builder is temporarily unavailable while it is being redesigned.' });
}
