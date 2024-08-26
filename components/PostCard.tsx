"use client"

import { FullPostType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  format,
  formatDistanceToNowStrict,
  isWithinInterval,
  subWeeks,
} from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdCalendarMonth, MdComment, MdThumbUp } from "react-icons/md";

interface PostCardProps {
  id: number;
  post: FullPostType;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const oneWeekAgo = subWeeks(new Date(), 1);
  const isRecent = isWithinInterval(post.createdAt, {
    start: oneWeekAgo,
    end: new Date(),
  });

  const formattedDate = format(post.createdAt, "MMM d");
  let relativeTime = formatDistanceToNowStrict(post.createdAt, {
    addSuffix: false,
  });
  relativeTime = relativeTime.replace("minutes", "min").replace("hour", "h").replace("seconds", "sec");

  const displayDate = isRecent ? relativeTime : formattedDate;
  return (
    <div>
      <div className="hover:shadow-sm border transition overflow-hidden rounded-lg h-full min-h-52 flex flex-col">
        <div className="flex-1 space-y-2 flex">
          <div className="relative w-full aspect-video overflow-hidden border-b">
            <Image
              src={
                post?.thumbnail
                  ? post.thumbnail
                  : "https://avatars.githubusercontent.com/u/93220191?v=4"
              }
              alt={post.title}
              className="object-cover"
              quality={100}
              fill
            />
          </div>
          <Link href={`/${post.user.username}/${post.id}`} className="flex flex-col pt-2 px-3 space-y-4 min-w-96 justify-between">
            <div className="flex flex-col space-y-4">
              <Link href={"/"} className="flex space-x-4">
                <Avatar>
                  <AvatarImage
                    src={
                      post?.user?.image
                        ? post?.user?.image
                        : "https://avatars.githubusercontent.com/u/93220191?v=4"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between py-1">
                  <span className="text-sm font-semibold">
                    {post.user.name} {post.user.surname}
                  </span>
                  <span className="text-xs font-light">
                    @{post.user.username}
                  </span>
                </div>
              </Link>
              <div className="text-sm md:text-xl font-bold group-hover:text-slate-500 transition line-clamp-2">
                {post.title}
              </div>
              <div className="text-sm font-light">{post.summary}</div>
            </div>
            <div className="flex pb-3 gap-2">
              <div className="grid grid-cols-3 min-w-52">
                <span className="flex gap-1 flex-nowrap text-nowrap">
                  <MdCalendarMonth />
                  <span className="text-xs">{displayDate}</span>
                </span>
                <span className="flex gap-1 flex-nowrap text-nowrap">
                  <MdThumbUp />
                  <span className="text-xs">{displayDate}</span>
                </span>
                <span className="flex gap-1 flex-nowrap text-nowrap">
                  <MdComment />
                  <span className="text-xs">{displayDate}</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
