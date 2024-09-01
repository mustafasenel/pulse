import getCurrentUser from "@/app/actions/getCurrentUser";
import { json } from "stream/consumers";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.username) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    console.log(body)
    const updatedCover = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        coverImage: body.data,
      },
    });

    return new NextResponse(JSON.stringify(updatedCover), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new NextResponse("Internal error", { status : 500 });
  }
}
