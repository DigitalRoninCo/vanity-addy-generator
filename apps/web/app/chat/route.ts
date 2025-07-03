// apps/web/app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  // Here you would typically call an AI service like OpenAI
  // This is a mock response:
  const lastMessage = messages[messages.length - 1].content;
  const reply = `I received your message about "${lastMessage}". This is a mock response.`;
  
  return NextResponse.json({ reply });
}