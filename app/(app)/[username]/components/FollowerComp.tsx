import { FullUserType } from '@/types'
import React from 'react'
import { MdPeopleAlt } from "react-icons/md";


interface FollowerCompProps {
    user?: FullUserType | null;
    currentUser?: FullUserType | null;
}

const FollowerComp:React.FC<FollowerCompProps> = ({ user, currentUser }) => {
  return (
    <div className='flex items-center justify-between space-x-6'>
      <div className="flex items-center space-x-2">
        <MdPeopleAlt size={20}/>
        <span>{user?.followings?.length}</span>
        <span className='text-sm text-muted-foreground'>followers</span>
      </div>
      <div className="flex items-center space-x-2">
        <MdPeopleAlt size={20}/>
        <span>{user?.followers?.length}</span>
        <span className='text-sm text-muted-foreground'>following</span>
      </div>
    </div>
  )
}

export default FollowerComp
