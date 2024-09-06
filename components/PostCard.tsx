"use client";

import { FullPostType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  format,
  formatDistanceToNowStrict,
  isWithinInterval,
  subWeeks,
} from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { MdCalendarMonth, MdComment, MdThumbUp } from "react-icons/md";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";
import { User } from "@prisma/client";
import DeleteDialog from "./DeleteDialog";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: FullPostType;
  showDelete?: boolean;
  currentUser?: User | null | undefined;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  showDelete,
  currentUser,
}) => {
  const [displayDate, setDisplayDate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const oneWeekAgo = subWeeks(new Date(), 1);
    const isRecent = isWithinInterval(post.createdAt, {
      start: oneWeekAgo,
      end: new Date(),
    });

    let relativeTime = formatDistanceToNowStrict(post.createdAt, {
      addSuffix: false,
    });
    relativeTime = relativeTime
      .replace("minutes", "min")
      .replace("hours", "h")
      .replace("seconds", "sec");

    setDisplayDate(isRecent ? relativeTime : format(post.createdAt, "MMM d"));
  }, [post.createdAt]);

  const handleDelete = () => {
    try {
      axios.delete(`/api/post/${post.id}`)
      .then(() => {
        toast.success("Post deleted");
      })
      .finally(() => {
        router.refresh()
      }) 
    } catch (error: any) {
      console.error("Failed to delete post", error)
      toast.error("Failed to delete post")
    }
  }

  return (
    <div>
      <div className="relative hover:shadow-sm border transition overflow-hidden rounded-lg h-full min-h-52 flex flex-col">
        {currentUser && currentUser.id == post.userId && showDelete && (
          <Button className="absolute top-2 right-2" variant="ghost" onClick={handleOpenModal}>
            <FaTrash />
          </Button>
        )}
        <div className="flex-1 space-y-2 flex">
          <div className="relative sm:w-52 md:w-64 lg:w-72 w-80 overflow-hidden border-b">
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
          <Link
            href={`/post/${post.user.username}/${post.id}`}
            className="flex flex-1 flex-col pt-2 px-3 space-y-4 min-w-96 justify-between"
          >
            <div className="flex flex-col space-y-4">
              <Link href={`/${post.user.username}`} className="flex space-x-4">
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
      <DeleteDialog isOpen={isModalOpen} onClose={handleCloseModal} onDelete={handleDelete}/>
    </div>
  );
};

export default PostCard;
