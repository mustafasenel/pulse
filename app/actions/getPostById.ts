import prisma from "@/lib/prismadb";
import { FullPostType } from "@/types";

const getPostById = async (postId: string): Promise<FullPostType | null> => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },

      include: {
        user: true,
        postCategories: true,
      },
    });
    return post as FullPostType;
  } catch (error: any) {
    return null;
  }
};

export default getPostById;
