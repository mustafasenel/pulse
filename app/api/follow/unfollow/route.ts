import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { followingId, followerId } = body;

    if (!followingId || !followerId) {
      return new NextResponse("Missing parameters", { status: 400 });
    }

    // Takip ilişkisini bul ve sil
    const deletedFollow = await prisma.follower.deleteMany({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    if (deletedFollow.count === 0) {
      return new NextResponse("Follow relationship not found", { status: 404 });
    }

    return NextResponse.json({ message: "Successfully unfollowed" });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
