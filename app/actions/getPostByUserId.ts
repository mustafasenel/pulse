import prisma from "@/lib/prismadb";
import { FullPostType } from "@/types";

const getPostByUserId = async (userId: string): Promise<FullPostType[] | null> => {
  try {
    const post = await prisma.post.findMany({
      where: {
        userId: userId,
      },

      include: {
        user: true,
        postCategories: true,
      },
    });

    return post as FullPostType[];

  } catch (error: any) {
    return null;
  }
};

export default getPostByUserId;
