import { Account, Post, PostCategory, User } from "@prisma/client";

export type FullPostType = Post & {
    user: User;
    postCategories: PostCategory[]
}

export type FullUserType= User & {
    account: Account[] | null
}