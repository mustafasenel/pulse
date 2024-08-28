"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FullUserType } from "@/types"


const accountFormSchema = z.object({
  oldPassword: z
  .string(),
newPassword: z
  .string()
  .min(6, {
    message: "New password must be at least 6 characters.",
  }),
passwordAgain: z
  .string()
  .min(6, {
    message: "Please confirm your new password.",
  })
}).refine(data => data.newPassword === data.passwordAgain, {
path: ["passwordAgain"],
message: "New password and confirmation must match.",
}).refine(data => data.newPassword != data.oldPassword, {
  path: ["newPassword"],
  message: "New password cannot be the same as the old password.",
  })

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  oldPassword:"",
  newPassword:"",
  passwordAgain: ""
}

interface AccountFormProps {
  user: FullUserType;
}
export function AccountForm({user} : AccountFormProps) {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  function onSubmit(data: AccountFormValues) {

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Old Password" {...field} disabled={!!user?.account?.length}/>
              </FormControl>
              <FormDescription>
                Enter your old password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="New Password" {...field} disabled={!!user?.account?.length}/>
              </FormControl>
              <FormDescription>
                Enter your new password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />        <FormField
        control={form.control}
        name="passwordAgain"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password Again</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Again Password" {...field} disabled={!!user?.account?.length}/>
            </FormControl>
            <FormDescription>
              Enter your new password again.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
        <Button type="submit" disabled={!!user?.account?.length}>Update password</Button>
      </form>
    </Form>
  )
}
