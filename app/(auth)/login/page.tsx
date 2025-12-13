
import LoginForm from '@/components/forms/LoginForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: "Login to Carebond"
}

export default function Page() {
  return (
    <div className='w-full  col-center gap-5'>
      <div className='text-center space-y-1'>

        <h2 className='text-foreground text-[20px] font-ut font-medium'>Sign In</h2>
        <p className='text-grey-dark'>Please enter below details to access the dashboard</p>

      </div>

      <LoginForm />

    </div>
  )
}
