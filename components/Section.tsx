"use client"

import { cn } from '@/lib/utils';
import React from 'react'

interface SectionProps {
    title: string;
    children?: React.ReactNode;
    hight?: string

}

const Section:React.FC<SectionProps> = ({
    title,
    children,
    hight
}) => {
  return (
    <div className={cn(`container w-full flex flex-col p-6 space-y-10`, hight ? `h-[${hight}]` : `h-[500px]`)}>
        <div className="flex">
            <h2 className="font-bold text-2xl">
                {title}
            </h2>
        </div>
        {children}
    </div>
  )
}

export default Section
