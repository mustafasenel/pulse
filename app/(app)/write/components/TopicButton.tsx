"use client"

import React from 'react'
import { MdClose } from 'react-icons/md';

interface TopicButtonProps {
    topic: string;
    onClick?: () => void;
}

const TopicButton: React.FC<TopicButtonProps> = ({
    topic,
    onClick
}) => {
  return (
    <div className='flex items-center justify-start px-2 py-1 rounded-sm border text-xs gap-1'>
      { topic }
      <button className='rounded-full px-1 hover:opacity-50 transition' onClick={onClick || (() => {})}><MdClose size={13}/></button>
    </div>
  )
}

export default TopicButton
