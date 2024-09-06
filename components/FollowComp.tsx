"use client";

import { Button } from "@/components/ui/button";
import { FullUserType } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface FollowCompProps {
  user?: FullUserType;
  currentUser?: FullUserType;
}

const FollowComp: React.FC<FollowCompProps> = ({ user, currentUser }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Takip durumu kontrolü
    const checkFollowStatus = async () => {
      if (user && currentUser) {
        const response = await axios.get(`/api/follow/check?followingId=${user.id}&followerId=${currentUser.id}`);
        setIsFollowing(response.data.isFollowing);
      }
    };

    checkFollowStatus();
  }, [user, currentUser]);

  const handleFollow = async () => {
    if (isFollowing) {
      // Takipten çık
      await axios.delete("/api/follow/unfollow", {
        data: { followingId: user?.id, followerId: currentUser?.id },
      }).then(()=> {
        router.refresh()
      });
      setIsFollowing(false);
    } else {
      // Takip et
      await axios.post("/api/follow/followed", {
        followingId: user?.id,
        followerId: currentUser?.id,
      }).then(() => {
        router.refresh()
      });
      setIsFollowing(true);
    }
  };

  return (
    <div>
      {user && currentUser && user?.username !== currentUser?.username && (
        <Button variant={"outline"} className="rounded-full text-xs" onClick={handleFollow}>
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}
    </div>
  );
};

export default FollowComp;
