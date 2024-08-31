import { Separator } from "@/components/ui/separator"
import getPostByUserId from "@/app/actions/getPostByUserId"
import getUserById from "@/app/actions/getUserById"
import UserPost from "./UserPost"
import getCurrentUser from "@/app/actions/getCurrentUser"

interface IParams {
  username: string
}

export default async function PostsPage({ params }: { params:IParams } ) {
  const user = await getUserById(params.username)
  const posts = await getPostByUserId(user?.id!)
  const currentUser = await getCurrentUser()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Latest Posts</h3>
        <p className="text-sm text-muted-foreground">
          Latest post from {user?.name}
        </p>
      </div>
      <Separator />
      <UserPost posts={posts} currentUser={currentUser}/>
    </div>
  )
}
