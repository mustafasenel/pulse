import { Account, Education, Post, PostCategory, User, WorkExperience } from "@prisma/client";

export type FullPostType = Post & {
    user: User;
    postCategories: PostCategory[]
}

export type FullUserType= User & {
    account: Account[] | null
}

export type FullWorkExperienceType = WorkExperience & {
    user: User
}

export type FullEducationType =  Education & {
    user: User
}