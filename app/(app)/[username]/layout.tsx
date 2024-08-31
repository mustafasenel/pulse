import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import Navbar from "@/components/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Image from "next/image";
import getUserById from "@/app/actions/getUserById";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";


interface IParams {
  username: string;
}

export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const user = await getUserById(params.username);

  return {
    title: `Pulse | ${user?.name || 'Profile'}`,
    description: `Explore the profile of ${user?.name || 'this user'}`,
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
    }

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
      <div className="group relative h-72 flex flex-col items-center justify-center space-y-10 bg-gradient-to-r from-slate-100 to-slate-300 dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-700 transition-all">
        <div className="absolute bottom-2 right-2 hidden group-hover:flex transition-all">
          <div className="flex items-center space-x-2 transition-all">
            <Button className="" variant={"outline"}>
              Change Cover
            </Button>
            <Button className="" variant={"destructive"}>
              <IoMdClose size={16} />
            </Button>
          </div>
        </div>
      </div>
      <div className="md:container w-full">
        <div className="space-y-6 p-10 pb-16">
          <div className="flex space-x-6">
            <div className="flex items-center justify-center">
              <Image
                alt="avatar"
                src={
                  user?.image
                    ? user?.image
                    : "https://avatars.githubusercontent.com/u/93220191?v=4"
                }
                className="md:w-16 w-14 rounded-full"
                width={30}
                height={30}
                unoptimized
              />
            </div>
            <div className="space-y-0.5">
              <h2 className="md:text-2xl text-lg font-bold tracking-tight">
                {user?.name}
              </h2>
              <p className="md:text-base text-sm text-muted-foreground">@{user?.username}</p>
            </div>
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
