import { NextResponse } from 'next/server';
import prisma from '@/db/prismaClient';

// route for sending messages
export async function POST(req) {
  const { conversationId, content, senderId } = await req.json();

  const message = await prisma.message.create({
    data: {
      content,
      senderId,
      conversationId,
    },
    include: {
      sender: true,
    },
  });

  return NextResponse.json(message);
}
