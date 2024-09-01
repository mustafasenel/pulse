import { FullEducationType } from '@/types'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { cn } from "@/lib/utils";
  import { IoSchool } from "react-icons/io5";
import { format } from 'date-fns';

interface EducationProps {
    educations: FullEducationType[] | null | undefined
}

const Education:React.FC<EducationProps> = ({ educations }) => {
  return (
<div className="flex w-full">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-4">
          <IoSchool size={24} />
          <span>Education</span>
        </div>
        {educations && educations.length > 0 ? (
          educations.map((experience, index) => (
            <Card
              key={index}
              className={cn(
                "max-w-2xl",
                experience.currentlyWorking && "border-emerald-500"
              )}
            >
              <CardHeader>
                <CardTitle>{experience.school}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{experience.field} - {experience.degree}</span>

                  <span>
                    {format(experience.startDate, "MMMM yyyy")} - {" "}
                    {!experience.currentlyWorking && experience?.endDate
                      ? format(experience?.endDate, "MMMM yyyy")
                      : "Currently Working"}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm">{experience.detail}</CardContent>
              <CardFooter></CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-sm">No experiences added.</div>
        )}
      </div>
    </div>
  )
}

export default Education
