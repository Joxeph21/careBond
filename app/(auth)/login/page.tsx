import Button from '@/components/common/Button'
import FormInput from '@/components/common/FormInput'
import InputText from '@/components/common/InputText'
import { ICON } from '@/utils/icon-exports'
import { Icon } from '@iconify/react'
import { Metadata } from 'next'
import Link from 'next/link'
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
      <FormInput>
        <InputText
          label='Email Address'
          prefix={ICON.USER}
          config={{
            type: "email",
            placeholder: "Enter Email Address"
          }} />
        <InputText
          prefix={ICON.LOCK}
          label='Password'
          config={{
            type: "password",
          }} />
        <div className='flex-between w-full gap-2 '>
          <div className='inline-flex items-center gap-2'>
            <label htmlFor="rememberMe">Remember Me</label>
            <input type="checkbox" aria-label='Remember me' name='rememberMe' className='-order-1 cursor-pointer accent-primary' />
          </div>

          <Link href={"/forgot-password"} className='hover:underline text-danger'>Forgot Password?</Link>
        </div>

        <Button link href='/2fa' size='full'>Login</Button>

   <div className='w-full flex-center relative'>
                    <p className='bg-white z-1 px-5'>OR</p>
                    <div className='top-1/2 absolute w-full h-px bg-grey rounded-full'></div>
                </div>

                <ul className=' w-full gap-4 flex-between'>
                    <li className='w-full'>
                        <Button config={{
                            className: "py-2!"
                        }} variants='outlined' size='full'>
                            <Icon icon={ICON.FACEBOOK} color="#2F80ED" fontSize={24} />
                        </Button>
                    </li>
                    <li className='w-full'>
                        <Button config={{
                            className: "py-2!"
                        }} variants='outlined' size='full'>
                            <Icon icon={ICON.GOOGLE} fontSize={24} />
                        </Button>
                    </li>
                    <li className='w-full'>
                        <Button config={{
                            className: "py-2!"
                        }} variants='outlined' size='full'>
                            <Icon icon={ICON.APPLE}  fontSize={24} />
                        </Button>
                    </li>
                </ul>

        <p className='font-medium'>Don&apos;t have an account? <Link className='text-primary hover:underline' href={"/register"}>Register</Link></p>

      </FormInput>


    </div>
  )
}
