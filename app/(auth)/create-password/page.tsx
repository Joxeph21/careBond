"use client"
import Button from '@/components/common/Button'
import FormInput from '@/components/common/FormInput'
import InputText from '@/components/common/InputText'
import { ICON } from '@/utils/icon-exports'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Page() {
  const [passwordSet, setPasswordSet] = useState(false)

  if (passwordSet) return <div className='w-full  col-center gap-5'>

    <Icon icon={ICON.CHECKED_FILLED} fontSize={48} color="#27AE60" />
    <div className='text-center space-y-1'>


      <h2 className='text-foreground text-[20px] font-medium'>Success</h2>
      <p className='text-grey-dark'>Your new password has been successfully saved.</p>



    </div>
    <Button link href='/login' size='full'>Back to Login</Button>

  </div>


  return (
    <div className='w-full  col-center gap-5'>
      <div className='text-center space-y-1'>

        <h2 className='text-foreground text-[20px] font-medium'>Reset Password</h2>
        <p className='text-center text-grey-dark'>Your new password must be different from previous used passwords.</p>

      </div>
      <FormInput>

        <InputText
          prefix={ICON.LOCK}
          label='Password'
          config={{
            type: "password",
          }} />
        <InputText
          prefix={ICON.LOCK}
          label='Confirm Password'
          config={{
            type: "password",
          }} />


        <Button config={{
          onClick: () => setPasswordSet(true)
        }} size='full'>Submit</Button>
        <p>Return to <Link className='text-primary hover:underline' href={"/login"}>Login</Link></p>


      </FormInput>


    </div>
  )
}
