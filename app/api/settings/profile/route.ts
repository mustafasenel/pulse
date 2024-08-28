import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { json } from "stream/consumers";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { username, email, name, bio } = body;

    if (!currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data : {
            username,
            name,
            email,
            bio
        }
    })

    const responseBody = JSON.stringify({updatedUser: updatedUser})

    return new NextResponse(responseBody, {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            },
    })
  } catch (error: any) {
    return new NextResponse("internal error", { status: 500 });
  }
}
