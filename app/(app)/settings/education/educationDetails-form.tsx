"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import DatePicker from "@/components/DatePicker";
import { Icons } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { MdAdd, MdClose } from "react-icons/md";
import axios from "axios";
import { FullEducationType } from "@/types";
import { formatISO } from "date-fns";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

const appearanceFormSchema = z.object({
  education: z.array(
    z.object({
      id: z.string().optional(),
      school: z.string().nonempty({ message: "school name is required." }),
      field: z.string().nonempty({ message: "field is required." }),
      degree: z.string().optional(),
      detail: z.string().optional(),
      startDate: z.string(),
      endDate: z.string().optional().optional(),
      currentlyWorking: z.boolean().optional(),
    })
  ),
});

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>;

interface CareerDetailsFormProps {
  userEducation?: FullEducationType[] | null | undefined;
}

export function EducationDetailsForm({
  userEducation,
}: CareerDetailsFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteIds, setDeleteIds] = useState<string[]>([]); // Silinecek ID'leri saklamak için

  const router = useRouter();

  const defaultValues: Partial<AppearanceFormValues> = {
    education:
      userEducation?.map((exp) => ({
        id: exp.id,
        school: exp.school,
        field: exp.field,
        degree: exp.degree ?? undefined,
        detail: exp.detail ?? undefined,
        startDate: exp.startDate
          ? formatISO(exp.startDate, { representation: "date" })
          : "",
        endDate: exp.endDate
          ? formatISO(exp.endDate, { representation: "date" })
          : "",
        currentlyWorking: exp.currentlyWorking ?? undefined, // Convert null to undefined
      })) || [],
  };

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    name: "education",
    control: form.control,
  });

  async function onSubmit(data: AppearanceFormValues) {
    setIsLoading(true);

    try {
      const newEntries = data.education.filter((entry) => !entry.id); // New entries have no id
      const updatedEntries = data.education.filter((entry) => entry.id); // Updated entries have an id

      // Send new entries to the create endpoint
      if (newEntries.length > 0) {
        await axios.post("/api/settings/education/create", newEntries);
      }

      // Send updated entries to the update endpoint
      if (updatedEntries.length > 0) {
        await axios.post("/api/settings/education/update", updatedEntries);
      }
      toast.success("Education Details updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to submit data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(index: number) {
    const id = form.getValues(`education.${index}.id`);
    if (id) {
      try {
        // API isteği göndererek veritabanından silme işlemi gerçekleştirin
        await axios.delete(`/api/settings/education/delete/${id}`);
        toast.success("Education Details deleted successfully");
        // Silme işlemini gerçekleştirdikten sonra state güncelleyin
        setDeleteIds((prev) => [...prev, id]);
        remove(index);
      } catch (error) {
        console.error("Failed to delete entry:", error);
      }
    } else {
      remove(index);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className=" relative space-y-4 border rounded-md p-4"
            >
              <button
                onClick={() => handleDelete(index)}
                className="absolute top-2 right-2 p-2 rounded-full bg-transparent hover:bg-slate-600 transition-all"
              >
                <MdClose />
              </button>
              <FormField
                control={form.control}
                name={`education.${index}.school`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.field`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.degree`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.detail`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" cols={2} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 grid-cols-1">
                <FormField
                  control={form.control}
                  name={`education.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) =>
                            field.onChange(
                              date ? date.toISOString().split("T")[0] : ""
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`education.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          date={
                            field.value &&
                            !form.watch(`education.${index}.currentlyWorking`)
                              ? new Date(field.value)
                              : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date?.toISOString().split("T")[0] || undefined
                            )
                          }
                          disabled={form.watch(
                            `education.${index}.currentlyWorking`
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`education.${index}.currentlyWorking`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2 pt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id={`currentlyWork-${index}`}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={`currentlyWork-${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Ongoing Studies
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2 space-x-2"
            onClick={() =>
              append({
                school: "",
                field: "",
                startDate: "",
                endDate: "",
                currentlyWorking: false,
              })
            }
          >
            <MdAdd size={16} />
            <span>Add Work Experience</span>
          </Button>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update Career Details
        </Button>
      </form>
    </Form>
  );
}
