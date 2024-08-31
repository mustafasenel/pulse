"use client"

import DeleteDialog from "@/components/DeleteDialog";
import PostCard from "@/components/PostCard";
import { FullPostType } from "@/types";
import { User } from "@prisma/client";
import React, { useState } from "react";

interface UserPostProps {
  posts?: FullPostType[] | null;
  currentUser?: User | null |undefined
}

const UserPost: React.FC<UserPostProps> = ({ posts, currentUser }) => {

  return (
    <div className="flex flex-col gap-4">
      {posts ? (
        posts?.map((post) => <PostCard key={post.id} post={post} currentUser={currentUser} showDelete/>)
      ) : (
        <div className="flex items-center justify-center">No posts avaible</div>
      )}
      
    </div>
  );
};

export default UserPost;
