import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function DELETE(request:Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.username) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const postId = url.pathname.split("/").pop(); // path parametrelerinden postId'yi alır

    if (!postId) {
      return new NextResponse("Post ID not found", { status: 400 });
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return new NextResponse(JSON.stringify(deletedPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}
