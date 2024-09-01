import prisma from "@/lib/prismadb";
import { FullUserType } from "@/types";

const getUserById = async (username: string): Promise<FullUserType | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username },
      include: { followers: true, followings: true },
    });
    return user as FullUserType;
  } catch (error: any) {
    return null;
  }
};

export default getUserById;
