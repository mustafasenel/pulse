import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import LatestSection from "@/components/LatestSection";
import CategorySection from "@/components/CategorySection";
import getCurrentUser from "../actions/getCurrentUser";
import getPosts from "../actions/getPosts";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts() || [];
  return (
    <main className="w-full h-full">
      <Navbar user={currentUser!}/>
      <Header/>
      <div className="flex flex-col space-y-6">
        <Section title="Latest">
          <LatestSection/>
        </Section>
        <Section title="Categories">
          <CategorySection posts={posts!}/>
        </Section>  
      </div>
      
    </main>
  );
}
