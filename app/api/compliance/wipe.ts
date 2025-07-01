import { NextApiRequest, NextApiResponse } from 'next'
import { initiateWipe } from '../../lib/wipe-utils.js'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE')
    return res.status(405).end('Method Not Allowed')
  }

  try {
    const { userId } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const txSignature = await initiateWipe(userId)
    res.status(202).json({ txSignature })
  } catch (err) {
    res.status(400).json({ error: 'Invalid request' })
  }
}

