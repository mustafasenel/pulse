import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { FullWorkExperienceType } from "@/types";
import { format } from "date-fns";
import React from "react";
import { MdWorkHistory } from "react-icons/md";

interface WorkExperiencesProps {
  experiences?: FullWorkExperienceType[] | null | undefined;
}

const WorkExperiences: React.FC<WorkExperiencesProps> = ({ experiences }) => {
  return (
    <div className="flex w-full">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-4">
          <MdWorkHistory size={24} />
          <span>Work Experiences</span>
        </div>
        {experiences && experiences.length > 0 ? (
          experiences.map((experience, index) => (
            <Card
              key={index}
              className={cn(
                "max-w-2xl",
                experience.currentlyWorking && "border-emerald-500"
              )}
            >
              <CardHeader>
                <CardTitle>{experience.company}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span>{experience.role}</span>
                  <span>
                    {format(experience.startDate, "MMMM yyyy")} -{" "}
                    {experience?.endDate
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
  );
};

export default WorkExperiences;
