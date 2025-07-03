import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { initiateWipe } from '@/lib/wipe-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers['authorization'] || '';
  const token = Array.isArray(authHeader)
    ? authHeader[0]
    : authHeader.replace(/^Bearer\s+/i, '');

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'secret';
    const payload = jwt.verify(token, secret) as { userId?: string };

    const userId = payload.userId || req.body?.userId;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    const { txSignature } = await initiateWipe(userId);
    return res.status(202).json({ txSignature });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
}

