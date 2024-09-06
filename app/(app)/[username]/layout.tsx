import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import Navbar from "@/components/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Image from "next/image";
import getUserById from "@/app/actions/getUserById";
import Cover from "./components/Cover";
import FollowerComp from "./components/FollowerComp";
import FollowComp from "@/components/FollowComp";

interface IParams {
  username: string;
}

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}): Promise<Metadata> {
  const user = await getUserById(params.username);

  return {
    title: `Pulse | ${user?.name || "Profile"}`,
    description: `Explore the profile of ${user?.name || "this user"}`,
  };
}

export default async function SettingsLayout({
  children,
  params,
}: {
  params: IParams;
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  const user = await getUserById(params.username);

  const sidebarNavItems = [
    {
      title: "Profile",
      href: `/${user?.username}`,
    },
    {
      title: "Posts",
      href: `/${user?.username}/posts`,
    },
  ];
  if (currentUser?.id === user?.id) {
    sidebarNavItems.push({
      title: "Settings",
      href: `/settings`,
    });
  }

  return (
    <div className="w-full h-full">
      <Navbar user={currentUser!} />
      <Cover user={user} currentUser={currentUser} />
      <div className="md:container w-full">
        <div className="space-y-6 p-10 pb-16">
          <div className="flex items-center justify-between ">
            <div className="flex space-x-6">
              <div className="flex items-center justify-center">
                <Image
                  alt="avatar"
                  src={
                    user?.image
                      ? user?.image
                      : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                  }
                  className="md:w-16 w-14 rounded-full"
                  width={30}
                  height={30}
                  unoptimized
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-4">
                  <h2 className="md:text-2xl text-lg font-bold tracking-tight">
                    {user?.name}
                  </h2>
                  <FollowComp user={user!} currentUser={currentUser!} />
                </div>
                <p className="md:text-base text-sm text-muted-foreground">
                  @{user?.username}
                </p>
              </div>
            </div>
            <FollowerComp user={user} currentUser={currentUser} />
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
