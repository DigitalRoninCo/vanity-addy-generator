import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { messages } = req.body as { messages: { role: string; content: string }[] };
  const last = messages[messages.length - 1];
  // Simple echo response for demonstration.
  res.status(200).json({ reply: `You said: ${last.content}` });
}
