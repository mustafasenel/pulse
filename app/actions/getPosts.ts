import prisma from '@/lib/prismadb'
import { FullPostType } from '@/types';

const getPosts = async():Promise<FullPostType[]> => {
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
        return posts as FullPostType[];
    } catch (error: any) {
        return [];
    }
}


export default getPosts
