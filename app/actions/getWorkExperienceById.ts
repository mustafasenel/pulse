import { FullWorkExperienceType } from "@/types";
import prisma from "@/lib/prismadb";

const getWorkExperienceBy = async (
  userId: string | undefined,
  username: string | undefined
): Promise<FullWorkExperienceType[] | null> => {
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

    const workExperience = await prisma.workExperience.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: true,
      },
    });

    return workExperience as FullWorkExperienceType[];
  } catch (error: any) {
    console.error(error); 
    return [];
  }
};

export default getWorkExperienceBy;
