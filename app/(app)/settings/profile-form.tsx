"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import { FullUserType } from "@/types";
import { IoIosLink } from "react-icons/io";
import { FaGithub, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(300).min(4),
  name: z.string().max(160).min(2),
  links: z
  .array(
    z.object({
      value: z
        .string()
        .optional()
        .refine((val) => !val || val.trim() === "" || z.string().url().safeParse(val).success, {
          message: "Please enter a valid URL.",
        }),
    })
  ).optional()
});

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

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormTypes {
  user: FullUserType;
}

export function ProfileForm({ user }: ProfileFormTypes) {
  const defaultValues: Partial<ProfileFormValues> = {
    bio: user.bio || "",
    username: user.username || "",
    email: user.email || "",
    name: user.name || "",
    links: user.links?.map((link) => ({ value: link })) || [],
  };

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append } = useFieldArray({
    name: "links",
    control: form.control,
  });

  function onSubmit(data: ProfileFormValues) {
    try {
      setIsLoading(true);
      axios
        .post("/api/settings/profile", data)
        .then(() => {
          toast.success("Profile updated successfully!");
        })
        .finally(() => {
          setIsLoading(false);
          router.refresh();
        });
    } catch (error) {
      toast.error("An error occurred");
      console.log(error);
    }
  }

  const urls = [0, 1, 2, 3];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="pulse"
                  {...field}
                  disabled={!!user?.account?.length}
                />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="pulse"
                  {...field}
                  disabled={!!user?.account?.length}
                />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="pulse"
                  {...field}
                  disabled={!!user?.account?.length}
                />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your email settings.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  cols={4}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {urls.map((index) => (
            <FormField
              control={form.control}
              key={index}
              name={`links.${index}.value`}
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center text-lg">
                        {getIconForUrl(field.value)}
                      </div>
                      <Input {...field} placeholder="Link to social profile" className="py-0.5 text-xs"/>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Update profile
        </Button>
      </form>
    </Form>
  );
}
