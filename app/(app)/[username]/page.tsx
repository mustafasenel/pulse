import getCurrentUser from "@/app/actions/getCurrentUser";
import getUserById from "@/app/actions/getUserById";
import getWorkExperienceBy from "@/app/actions/getWorkExperienceById";
import { Separator } from "@/components/ui/separator";
import WorkExperiences from "./components/WorkExperiences";
import Education from "./components/Education";
import getEducationBy from "@/app/actions/getEducationById";
import { MdPerson } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { FaGithub, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

interface IParams {
  username: string;
}

function getIconForUrl(url: string) {
  if (url) {
    if (url.includes("twitter.com") || url.includes("x.com")) {
      return <FaXTwitter />;
    } else if (url.includes("github.com")) {
      return <FaGithub />;
    } else if (url.includes("facebook.com")) {
      return <FaFacebook />;
    } else if (url.includes("linkedin.com")) {
      return <FaLinkedin />;
    } else if (url.includes("instagram.com")) {
      return <FaInstagram />;
    } else {
      return <IoIosLink />;
    }
  } else {
    return <IoIosLink />;
  }
}

const UserDetail = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const user = await getUserById(params.username);
  const workExperiences = await getWorkExperienceBy(user?.id, params.username);
  const educations = await getEducationBy(user?.id, params.username);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
      </div>
      {user?.bio && (
        <div className="space-y-4">
          <Separator />
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex gap-4 max-w-2xl">
              <MdPerson size={24} />
              <span>Bio</span>
            </div>
            <p className="text-sm">{user?.bio}</p>
          </div>
        </div>
      )}

      {user?.links && user.links.length > 0 && (
        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex gap-4 max-w-2xl">
              <IoIosLink size={24} />
              <span>Social Links</span>
            </div>
            {user?.links.map((link, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex items-center justify-center text-lg">
                  {getIconForUrl(link)}
                </div>
                <Link
                  className="text-xs hover:underline text-muted-foreground"
                  href={link}
                >
                  {link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator />
      <WorkExperiences experiences={workExperiences} />
      <Separator />
      <Education educations={educations} />
    </div>
  );
};

export default UserDetail;
