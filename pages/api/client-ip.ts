import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const clientIp =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';
  res.status(200).json({ clientIp });
}
