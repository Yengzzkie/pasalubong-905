import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const response = await prisma.user.findUnique({
        where: { id: userId },
        include: { posts: true }
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}


