"use client"
import React, { useState } from 'react'
import Button from '@/components/common/Button'
import FormInput from '@/components/common/FormInput'
import InputText from '@/components/common/InputText'
import { ICON } from '@/utils/icon-exports'
import Link from 'next/link'
import { Icon } from '@iconify/react'


export default function ForgotPasswordContent() {
    const [emailSent, setEmailSent] = useState(false)

    const handleEmailSend = () => {
        setEmailSent(true)
    }

    // #27AE60

    if (emailSent) return <div className='w-full  col-center gap-5'>

        <Icon icon={ICON.CHECKED_FILLED} fontSize={48} color="#27AE60" />
        <div className='text-center space-y-1'>


            <h2 className='text-foreground text-[20px] font-medium'>Email Sent!</h2>
            <p className='text-grey-dark'>Check your email & change your password</p>



        </div>
        <Button link href='/verify' size='full'>Reset Password</Button>

    </div>

    return (
        <div className='w-full  col-center gap-5'>
            <div className='text-center space-y-1'>

                <h2 className='text-foreground text-[20px] font-medium'>Forgot Password</h2>
                <p className='text-grey-dark'>No worries, we&apos;ll send you reset instructions</p>

            </div>
            <FormInput>
                <InputText
                    label='Email Address'
                    prefix={ICON.MAIL}
                    config={{
                        type: "email",
                        placeholder: "Enter Email Address"
                    }} />

                <Button
                    config={{
                        onClick: handleEmailSend
                    }}
                    size='full'>Submit</Button>

                <p>Return to <Link className='text-primary hover:underline' href={"/login"}>Login</Link></p>

            </FormInput>


        </div>
    )
}
