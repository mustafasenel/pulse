import { Separator } from "@/components/ui/separator"
import { EducationDetailsForm } from "./educationDetails-form"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getEducationBy from "@/app/actions/getEducationById"

export default async function SettingsAppearancePage() {
  const currentUser = await getCurrentUser()
  const workExperiences = await getEducationBy(currentUser?.id, undefined)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Education Details</h3>
        <p className="text-sm text-muted-foreground">
          Add or update your education details and preferences.
        </p>
      </div>
      <Separator />
      <EducationDetailsForm userEducation={workExperiences}/>
    </div>
  )
}
