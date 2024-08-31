import Navbar from "@/components/Navbar";
import PostDetailComp from "./components/PostDetail"
import getCurrentUser from "@/app/actions/getCurrentUser";
import getPostById from "@/app/actions/getPostById";


interface IParams {
  postId: string;
}

export default async function PostDetail({ params } : {params: IParams} ) {
  const currentUser = await getCurrentUser();
  const post = await getPostById(params.postId);
  return (
    <main className="w-full h-full">
      <Navbar user={currentUser!} />
      <div className="container w-full py-24">
        <PostDetailComp post={post!}/>
      </div>
    </main>
  );
}
