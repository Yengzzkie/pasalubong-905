import { NextResponse } from 'next/server';
import prisma from '@/db/prismaClient';

// get all conversations for a specific user
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  const conversations = await prisma.conversationParticipant.findMany({
    where: { userId: userId },
    include: {
      conversation: {
        include: {
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1, // last message preview
          },
          participants: {
            include: { user: true },
          },
          post: true,
        },
      },
    },
  });

  return NextResponse.json(conversations);
}
