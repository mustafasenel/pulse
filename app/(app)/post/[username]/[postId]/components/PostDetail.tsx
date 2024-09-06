"use client";

import { FullPostType } from "@/types";
import React, { useEffect } from "react";
import hljs from "highlight.js";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, formatDistanceToNowStrict, isWithinInterval, subWeeks } from "date-fns";
import { MdCalendarMonth, MdComment, MdThumbUp } from "react-icons/md";

interface PostDetailProps {
  post: FullPostType;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  useEffect(() => {
    if (post?.content) {
      const blocks = document.querySelectorAll("pre code");
      blocks.forEach((block) => {
        // Ensure that the block is an HTMLElement
        if (block instanceof HTMLElement) {
          hljs.highlightElement(block);
        }
      });
    }
  }, [post?.content]);
  

  const oneWeekAgo = subWeeks(new Date(), 1);
  const isRecent = isWithinInterval(post?.createdAt, {
    start: oneWeekAgo,
    end: new Date(),
  });

  const formattedDate = format(post?.createdAt, "MMM d");
  let relativeTime = formatDistanceToNowStrict(post?.createdAt, {
    addSuffix: false,
  });

  // Replace full time units with abbreviations
  relativeTime = relativeTime.replace("minutes", "min").replace("hour", "h").replace("seconds", "sec");

  const displayDate = isRecent ? relativeTime : formattedDate;

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-16 max-w-4xl">
        <div className="flex w-full justify-center">
          <h1 className="text-5xl font-bold">{post?.title}</h1>
        </div>
        <div className="flex items-center justify-between">
          <Link href={"/"} className="flex max-w-4xl items-start space-x-4">
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
              <span className="text-xs font-light">@{post.user.username}</span>
            </div>
          </Link>
          <div className="flex pb-3 gap-2">
            <div className="grid grid-cols-3 min-w-52">
              <span className="flex gap-1 flex-nowrap text-nowrap items-center">
                <MdCalendarMonth size={20} />
                <span className="text-xs">{displayDate}</span>
              </span>
              <span className="flex gap-1 flex-nowrap text-nowrap items-center">
                <MdThumbUp size={20} />
                <span className="text-xs">{displayDate}</span>
              </span>
              <span className="flex gap-1 flex-nowrap text-nowrap items-center">
                <MdComment size={20} />
                <span className="text-xs">{displayDate}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <article
            className="max-w-4xl prose-headings:font-title font-default prose lg:prose-xl dark:prose-invert focus:outline-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></article>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
