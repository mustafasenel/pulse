"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  disabled?: boolean
}

export default function DatePicker({ date, onSelect, disabled } : DatePickerProps) {
  return (
    <div className={cn("grid gap-2")}>
    <Popover>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            // Pass the selected date back to the parent component
            onSelect(selectedDate ? new Date(selectedDate) : undefined);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    </div>
  )
}
