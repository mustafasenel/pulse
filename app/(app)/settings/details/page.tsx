import { Separator } from "@/components/ui/separator"
import { CareerDetailsForm } from "./careerDetails-form"
import getWorkExperienceBy from "@/app/actions/getWorkExperienceById"
import getCurrentUser from "@/app/actions/getCurrentUser"

export default async function SettingsAppearancePage() {
  const currentUser = await getCurrentUser()
  const workExperiences = await getWorkExperienceBy(currentUser?.id, undefined)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Career Details</h3>
        <p className="text-sm text-muted-foreground">
          Add or update your career details and preferences.
        </p>
      </div>
      <Separator />
      <CareerDetailsForm userWorkExperiences={workExperiences}/>
    </div>
  )
}
