import Navbar from "@/components/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ContentForm from "./components/content-form";
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();
  if (!currentUser?.email) {
    redirect("/")
  }
  return (
      <main className="w-full h-full">
        {currentUser && (
          <>
            <Navbar user={currentUser} />
            <div className="container w-full py-10">
              <ContentForm user={currentUser}/>
            </div>
          </>
        )}
      </main>
  );
}
