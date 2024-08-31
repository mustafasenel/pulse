import { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import Navbar from "@/components/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata: Metadata = {
  title: "Pulse | Settings",
  description: "Settings",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/settings/details/account",
  },
  {
    title: "Career Details",
    href: "/settings/details",
  },
  {
    title: "Education Details",
    href: "/settings/education",
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Display",
    href: "/settings/display",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  
  const currentUser = await getCurrentUser();
  
  return (
    <div className="w-full h-full">
      <Navbar user={currentUser!}/>
      <div className="container w-full">
        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
