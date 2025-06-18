import { NextResponse } from 'next/server';
import prisma from '@/db/prismaClient';

// route to get messages for a specific conversation
export async function GET(_, { params }) {
  const { id } = await params; // get conversation ID from params

  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    include: { sender: true },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(messages);
}

// route to mark all messages in a conversation as read
export async function PUT(_, { params }) {
  const { id } = await params;

  await prisma.message.updateMany({
    where: { conversationId: id },
    data: { read: true },
  });

  const messages = await prisma.message.findMany({
    where: { conversationId: id },
    include: { sender: true },
    orderBy: { createdAt: 'asc' },
  });

  return NextResponse.json(messages);
}