import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { title, content, categories, thumbnail, summary } = body;

    if (!currentUser?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Create the new post
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        thumbnail,
        summary,
        published: true,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
        // Post categories will be linked after the post is created
      },
    });

    // Link the categories with the new post
    if (categories && categories.length > 0) {
      await prisma.postCategory.createMany({
        data: categories.map((categoryId: string) => ({
          postId: newPost.id,
          categoryId,
        })),
      });
    }
    const responseBody = JSON.stringify({ post: newPost });

    return new NextResponse(responseBody, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
          createdAt: 'desc'
      },
      include: {
          user: true,
          postCategories: true
         
      }
  });
    return new NextResponse(JSON.stringify(posts));
  } catch (error: any) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
