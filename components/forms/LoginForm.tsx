"use client"
import Button from '@/components/common/Button'
import FormInput from '@/components/common/FormInput'
import InputText from '@/components/common/InputText'
import { useLogin } from '@/hooks/auth/useAuth'
import { LoginSchema } from '@/schema/auth-schema'
import { ICON } from '@/utils/icon-exports'
import { yupResolver } from "@hookform/resolvers/yup"
// import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

export default function LoginForm() {
    const { isPending, login } = useLogin()
    const { register, formState: { errors, isValid }, handleSubmit } = useForm<AuthLoginData>({
        mode: "all",
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            persist: false
        }
    })

    const onSubmit = (data: AuthLoginData) => {
        login(data)
    }

    return (
        <FormInput config={{
            onSubmit: handleSubmit(onSubmit)
        }}>
            <InputText
                label='Email Address'
                prefix={ICON.USER}
                error={!!errors.email}
                errorMessage={errors.email?.message}
                config={{
                    type: "email",
                    placeholder: "Enter Email Address",
                    ...register("email")
                }} />
            <InputText
                prefix={ICON.LOCK}
                error={!!errors.password}
                errorMessage={errors.password?.message}
                label='Password'
                config={{
                    type: "password",
                    ...register("password")
                }} />
            <div className='flex-between w-full gap-2 '>
                <div className='inline-flex items-center gap-2'>
                    <label htmlFor="rememberMe">Remember Me</label>
                    <input {...register("persist")} type="checkbox" aria-label='Remember me' id='rememberMe' className='-order-1 cursor-pointer accent-primary' />
                </div>

                <Link href={"/forgot-password"} className='hover:underline text-danger'>Forgot Password?</Link>
            </div>

            <Button config={{
                type: "submit",
                disabled: !isValid
            }} isLoading={isPending} size='full'>Login</Button>

            {/* <div className='w-full flex-center relative'>
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

        <p className='font-medium'>Don&apos;t have an account? <Link className='text-primary hover:underline' href={"/register"}>Register</Link></p> */}

        </FormInput>
    )
}
