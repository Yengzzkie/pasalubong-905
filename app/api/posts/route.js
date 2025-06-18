import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const pageSize = 20;
  const skip = (page - 1) * pageSize;
  const totalPage = await prisma.post.count();

  try {
    const response = await prisma.post.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { author: { include: { _count: { select: { posts: true } } } } }, // include number of posts by the user for the userAvatarCard
    });

    return NextResponse.json(
      { posts: response, total_page: Math.ceil(totalPage / pageSize) },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const {
      authorId,
      title,
      content,
      location,
      image,
      condition,
      contact_number,
      tags,
    } = await request.json();

    const newPost = await prisma.post.create({
      data: {
        authorId,
        title,
        content,
        location,
        image,
        condition,
        contact_number,
        tags,
      },
    });

    console.log(newPost);

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error({ error });
    return NextResponse.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}
