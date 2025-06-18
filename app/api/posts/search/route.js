import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

// handles searching posts based on a query parameter.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page")) || 1;
  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  try {
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { tags: { hasSome: [query] } },
        ],
      },
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      include: { author: true },
    });

    const totalPosts = await prisma.post.count({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { tags: { hasSome: [query] } },
        ],
      },
    });

    return NextResponse.json(
      {
        posts,
        total_page: Math.ceil(totalPosts / pageSize),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error searching posts:", error);
    return NextResponse.json(
      { error: "Failed to search posts" },
      { status: 500 }
    );
  }
}
