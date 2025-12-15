"use client"
import React, { useState } from 'react'
import Button from '@/components/common/Button'
import FormInput from '@/components/common/FormInput'
import InputText from '@/components/common/InputText'
import { ICON } from '@/utils/icon-exports'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ForgotPasswordRequestSchema } from '@/schema/auth-schema'
import { useRequestForgotPassword } from '@/hooks/auth/useAuth'


export default function ForgotPasswordContent() {
    const { requestForgotPassword, isPending } = useRequestForgotPassword()
    const [emailSent, setEmailSent] = useState(false)
    const { register, formState: { errors, isValid }, handleSubmit, getValues } = useForm<{ email: string }>({
        mode: "all",
        resolver: yupResolver(ForgotPasswordRequestSchema),
        defaultValues: {
            email: ""
        }
    })


    const email = getValues("email")

    const handleEmailSend = (data: { email: string }) => {
        requestForgotPassword(data, {
            onSuccess: () => {

                setEmailSent(true)
            }
        })
    }



    if (emailSent) return <div className='w-full  col-center gap-5'>

        <Icon icon={ICON.CHECKED_FILLED} fontSize={48} color="#27AE60" />
        <div className='text-center space-y-1'>


            <h2 className='text-foreground text-[20px] font-medium'>Email Sent!</h2>
            <p className='text-grey-dark'>Check your email & change your password</p>



        </div>
        <Button link href={`/verify?email=${encodeURIComponent(email)}`} size='full'>Reset Password</Button>

    </div>




    return (
        <div className='w-full  col-center gap-5'>
            <div className='text-center space-y-1'>

                <h2 className='text-foreground text-[20px] font-medium'>Forgot Password</h2>
                <p className='text-grey-dark'>No worries, we&apos;ll send you reset instructions</p>

            </div>
            <FormInput
                config={{
                    onSubmit: handleSubmit(handleEmailSend)
                }}
            >
                <InputText
                    label='Email Address'
                    prefix={ICON.MAIL}
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                    config={{
                        type: "email",
                        placeholder: "Enter Email Address",
                        ...register("email")
                    }} />

                <Button
                    config={{
                        type: "submit",
                        disabled: !isValid
                    }}
                    isLoading={isPending}
                    size='full'>Submit</Button>

                <p>Return to <Link className='text-primary hover:underline' href={"/login"}>Login</Link></p>

            </FormInput>


        </div>
    )
}
