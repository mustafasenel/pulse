import Navbar from "@/components/Navbar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";

interface IParams {
  username: string;
}

const UserDetail = async ({ params } : { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const user = await getUserById(params.username);
  
  return (
    <main className="w-full h-full">
      <Navbar user={currentUser!} />
      <div className="container w-full py-10"></div>
    </main>
  );
}

export default UserDetail
