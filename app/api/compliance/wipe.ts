import { NextApiRequest, NextApiResponse } from 'next'
import { initiateWipe } from "@/lib/wipe-utils"; 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    // Verify JWT and initiate wipe
    const { txSignature } = await 
    (req.body.userId);
    res.status(202).json({ txSignature });
  }
}
