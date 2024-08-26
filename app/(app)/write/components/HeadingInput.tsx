"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export interface HeadingInput
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const HeadingInput = React.forwardRef<HTMLInputElement, HeadingInput>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-full w-full border-0 text-5xl font-bold bg-transparent transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
HeadingInput.displayName = "Input"

export { HeadingInput }
