import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import getWorkExperienceBy from "@/app/actions/getWorkExperienceById";
import { Separator } from "@/components/ui/separator";
import WorkExperiences from "./components/WorkExperiences"
import Education from "./components/Education";
import getEducationBy from "@/app/actions/getEducationById";
import { MdPerson } from "react-icons/md";


interface IParams {
  username: string;
}

const UserDetail = async ({ params } : { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const user = await getUserById(params.username);
  const workExperiences = await getWorkExperienceBy(undefined, params.username);
  const educations = await getEducationBy(undefined, params.username);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      <Separator />
      <div className="flex flex-col gap-6 max-w-2xl">
        <div className="flex gap-4 max-w-2xl">
          <MdPerson size={24} />
          <span>Bio</span>

        </div>
        <p>{user?.bio}</p>
      </div>

      <Separator />
      <WorkExperiences experiences={workExperiences}/>
      <Separator />
      <Education educations={educations}/>
    </div>
  );
}

export default UserDetail
