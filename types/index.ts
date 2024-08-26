import { Post, PostCategory, User } from "@prisma/client";

export type FullPostType = Post & {
    user: User;
    postCategories: PostCategory[]
}