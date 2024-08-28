
import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { FaGithub, FaGoogle } from "react-icons/fa";

export default async function SettingsProfilePage() {

  const currentUser = await getCurrentUser();
  const userAccount = currentUser?.account?.find(
    (account) => currentUser.id === account.userId
  );

  const authMethod = userAccount ? userAccount.provider : "Not Connected";

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>

        {userAccount && (
          <div className="flex items-center w-fit mt-2 border-2 rounded-md py-4 px-4">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">
                {authMethod == "github" ? <FaGithub /> : <FaGoogle />}
                </div>
                <p className="text-sm text-muted-foreground">
                  You are connected via {authMethod== 'github' ? 'GitHub' : 'Google' }
                </p>
              </div>
          </div>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      <Separator />
      <ProfileForm user={currentUser!}/>
    </div>
  )
}
