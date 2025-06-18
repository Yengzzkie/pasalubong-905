import prisma from "@/db/prismaClient";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
      const { name, email, password, avatar, mobile } = await request.json();

      const isUserExist = await prisma.user.findUnique({
        where: { email }
      });

      if (isUserExist) {
        return NextResponse.json(
          { message: "User with that email already exists" },
          { status: 400 }
        );
      }

      const hashedPassword = await hash(password, 10);
  
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          avatar,
          mobile
        },
      });
  
      return NextResponse.json({
        message: "User created successfully. Please check your email for verification instructions.",
        user: {
          id: newUser.id,
          email: newUser.email,
        },
      }, { status: 201 });
    } catch (error) {
      console.error("Error creating user:", error);
      return NextResponse.json(
        { message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
  }