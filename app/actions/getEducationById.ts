import { FullEducationType } from "@/types";
import prisma from "@/lib/prismadb";

const getEducationBy = async (
  userId: string | undefined,
  username: string | undefined
): Promise<FullEducationType[] | null> => {
  try {
    let user;

    if (userId) {
      user = await prisma.user.findUnique({
        where: { id: userId },
      });
    } else if (username) {
      user = await prisma.user.findUnique({
        where: { username: username },
      });
    }

    if (!user) {
      return [];
    }

    const education = await prisma.education.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
    });

    return education as FullEducationType[];
  } catch (error: any) {
    return [];
  }
};

export default getEducationBy;
