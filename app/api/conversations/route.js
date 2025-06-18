import { NextResponse } from "next/server";
import prisma from "@/db/prismaClient";

// route for creating and/or retrieiving a conversation between two users
export async function POST(request) {
  const { postId, participantIds } = await request.json();

  // Sort to ensure consistent order
  const sortedIds = [...participantIds].sort();

  // Check if conversation already exists
  const existing = await prisma.conversation.findFirst({
    where: {
      postId: postId,
      participants: {
        every: {
          userId: {
            in: sortedIds,
          },
        },
      },
    },
    include: {
      participants: { include: { user: true } },
      post: true,
    },
  });

  if (existing) {
    return NextResponse.json(existing);
  }

  // if conversation doesn't exist, create new conversation
  const conversation = await prisma.conversation.create({
    data: {
      postId: postId,
      participants: {
        create: sortedIds.map((id) => ({ userId: id })),
      },
    },
    include: {
      participants: { include: { user: true } },
    },
  });

  return NextResponse.json(conversation);
}
