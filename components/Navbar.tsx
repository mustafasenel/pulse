"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { FaPen } from "react-icons/fa";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  MdLogout,
  MdMoney,
  MdMoneyOff,
  MdPerson,
  MdSettings,
} from "react-icons/md";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useFormContext } from "@/app/context/FormContext";
import { PublishModal } from "./modal/PublishModal";
import Image from "next/image";

interface NavbarProps {
  user?: User;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const path = usePathname();
  const isWritePage = path == "/write";
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { content } = useFormContext();

  const { setTheme, theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center gap-4">
        <div className="mr-4 hidden md:flex md:items-center space-x-6">
          <a href="/" className="mr-4 flex items-center lg:mr-6">
            <Image
              src={theme == "light" ? "/pulse.png" : "/pulse-dark.png"}
              alt="logo"
              width={100}
              height={50}
            />
          </a>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            <a
              href=""
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Categories
            </a>
            <a
              href=""
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Latest
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <button className="inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-full justify-start rounded-[0.5rem] bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64">
              <span className="hidden lg:inline-flex">Search...</span>
              <span className="lg:hidden inline-flex">Search...</span>
            </button>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {user ? (
            <>
              {isWritePage ? (
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={handleOpenModal}
                  disabled={content === "<p></p>" || !content}
                >
                  <span>Publish</span>
                </Button>
              ) : (
                <Link href={"/write"}>
                  <Button variant={"outline"} className="gap-2">
                    <FaPen />
                    <span>Write</span>
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.image
                          ? user?.image
                          : "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>@{user?.username}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Link
                        href={`/${user.username}`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <MdPerson />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={"/billing"}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <MdMoney />
                        <span>Billing</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href={"/settings"}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <MdSettings />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => signOut()}
                    >
                      <MdLogout />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href={"/authentication"}>
              <Button>Login</Button>
            </Link>
          )}
        </nav>
      </div>
      <PublishModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
      />
    </header>
  );
};

export default Navbar;
