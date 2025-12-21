import React from 'react'
import NotificationTab from '../common/NotificationTab'
import Image from 'next/image'

export default function UserTab() {
  return (
    <nav className='flex-center text-[#E4E4E4] gap-5'>
        <NotificationTab />
        | 
        <figure className='size-9.5 relative overflow-hidden bg-grey cursor-pointer rounded-full'>
            <Image src={"/user.png"} fill className='object-cover object-center' alt='User Profile Picture' />
        </figure>
    </nav>
  )
}
