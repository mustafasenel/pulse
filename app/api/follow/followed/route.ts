import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();

    const { followingId, followerId } = body;

    if (!currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (currentUser.id !== followerId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const existingFollow = await prisma.follower.findFirst({
      where: {
        follower: {
          id: followerId,
        },
        following: {
          id: followingId,
        },
      },
    });

    if (existingFollow) {
      return new NextResponse("Already following", { status: 400 });
    }

    const newFollower = await prisma.follower.create({
      data: {
        follower: {
          connect: {
            id: followerId,
          },
        },
        following: {
          connect: {
            id: followingId,
          },
        },
      },
    });
    return NextResponse.json(newFollower);
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
