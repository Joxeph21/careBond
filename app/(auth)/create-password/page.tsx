"use client"
import Button from '@/components/common/Button'
import FormInput from '@/components/common/FormInput'
import InputText from '@/components/common/InputText'
import { useForgotPassword } from '@/hooks/auth/useAuth'
import { ResetPasswordSchema } from '@/schema/auth-schema'
import { ICON } from '@/utils/icon-exports'
import { yupResolver } from '@hookform/resolvers/yup'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Page() {
  const { forgotPassword, isPending } = useForgotPassword()
  const { register, setValue, formState: { errors, isValid, }, handleSubmit } = useForm({
    mode: "all",
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      new_password: "",
      new_password_confirm: "",
      email: "",
      otp_code: ""

    }
  })
  const router = useRouter()
  const searchParams = useSearchParams()
  const otp_code = searchParams.get("otp") ?? ""
  const email = searchParams.get("email") ?? ""
  const [passwordSet, setPasswordSet] = useState(false)


  useEffect(() => {
    if (!email) {
      router.replace('/forgot-password')
    }

    if (!otp_code) {
      router.replace('/verify');
    }

    setValue('otp_code', otp_code, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue('email', email, {
      shouldValidate: true,
      shouldDirty: true,
    })

  }, [otp_code, router, email, setValue]);

  if (!otp_code || !email) return null;


  if (passwordSet) return <div className='w-full  col-center gap-5'>

    <Icon icon={ICON.CHECKED_FILLED} fontSize={48} color="#27AE60" />
    <div className='text-center space-y-1'>


      <h2 className='text-foreground text-[20px] font-medium'>Success</h2>
      <p className='text-grey-dark'>Your new password has been successfully saved.</p>



    </div>
    <Button link href='/login' size='full'>Back to Login</Button>

  </div>


  const onSubmit = (data: { new_password: string, new_password_confirm: string, email: string, otp_code: string }) => {
    forgotPassword(data, {
      onSuccess: () => setPasswordSet(true),

      onError: (err) => {
        if (err.message === "Invalid or expired OTP code.") {
          router.push(`/verify?email=${encodeURIComponent(email)}`)
        }
      }
    })
  }

  console.log(errors)

  return (
    <div className='w-full  col-center gap-5'>
      <div className='text-center space-y-1'>

        <h2 className='text-foreground text-[20px] font-medium'>Reset Password</h2>
        <p className='text-center text-grey-dark'>Your new password must be different from previous used passwords.</p>

      </div>
      <FormInput
        config={{
          onSubmit: handleSubmit(onSubmit)
        }}
      >

        <InputText
          prefix={ICON.LOCK}
          label='Password'
          error={!!errors.new_password}
          errorMessage={errors.new_password?.message}
          config={{
            type: "password",
            ...register("new_password")
          }} />
        <InputText
          prefix={ICON.LOCK}
          label='Confirm Password'
          error={!!errors.new_password_confirm}
          errorMessage={errors.new_password_confirm?.message}
          config={{
            type: "password",
            ...register("new_password_confirm")
          }} />


        <Button config={{
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
