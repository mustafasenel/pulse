import prisma from "@/lib/prismadb";

const getUserById = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { username: username } });
    return user;
  } catch (error: any) {
    return null;
  }
};

export default getUserById;
