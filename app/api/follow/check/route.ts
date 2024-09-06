import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const followingId = searchParams.get("followingId");
    const followerId = searchParams.get("followerId");

    if (!followingId || !followerId) {
      return new NextResponse("Missing parameters", { status: 400 });
    }

    // Mevcut bir takip kaydı var mı kontrol et
    const existingFollow = await prisma.follower.findFirst({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    return NextResponse.json({ isFollowing: Boolean(existingFollow) });
  } catch (error: any) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
