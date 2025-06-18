import prisma from "@/db/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.user.findMany();

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}


