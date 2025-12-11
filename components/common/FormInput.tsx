import React, { FormHTMLAttributes, PropsWithChildren } from 'react'

interface FormInputProps extends PropsWithChildren {
    config?: FormHTMLAttributes<HTMLFormElement>
}

export default function FormInput({ config, children }: FormInputProps) {
    return (
        <form
            {...config}
            className={` w-full max-w-2xl col-center gap-5 ${config?.className}`}>
            {children}
        </form>
    )
}
