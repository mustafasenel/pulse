import { Account, Education, Follower, Post, PostCategory, User, WorkExperience } from "@prisma/client";

export type FullPostType = Post & {
    user: User;
    postCategories: PostCategory[]
}

export type FullUserType= User & {
    account: Account[] | null
    followers: Follower[] | null
    followings: Follower[] | null
}

export type FullWorkExperienceType = WorkExperience & {
    user: User
}

export type FullEducationType =  Education & {
    user: User
}