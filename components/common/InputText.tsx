"use client"

import { InputHTMLAttributes, useState } from "react"
import { Icon } from "@iconify/react"
import { ICON } from "@/utils/icon-exports"

type InputProps = {
    config?: InputHTMLAttributes<HTMLInputElement>
    label?: string,
    error?: boolean,
    errorMessage?: string
    prefix?: string,
    suffix?: string,
}

export default function InputText({ label, config, error, errorMessage, prefix, suffix }: InputProps) {
    const [isVisible, setisVisible] = useState<boolean>(false)
    if (config?.type === "password") {
        return (
            <div className="w-full flex flex-col">
                {label && <label htmlFor={config?.name}>{label}</label>}
                <div className="w-full ring gap-2 py-1.5 p-3 ring-grey rounded-md flex-between">
                    {prefix && <span className="size-4 flex-center">
                        <Icon icon={prefix} fontSize={20} />

                    </span>}
                    <input {...config}
                        type={isVisible ? "text" : "password"}
                        placeholder="************"
                        className={` h-fit w-full   placeholder:text-placeholder outline-none ${config?.className}`}

                    />
                    <button type="button" onClick={() => setisVisible(!isVisible)} role="switch" aria-checked={isVisible} className="size-4 cursor-pointer flex-center">
                        <Icon icon={isVisible ? ICON.EYE_OFF : ICON.EYE} fontSize={20} />
                    </button>
                </div>
                {error && <p className="font-medium text-xs text-danger">{errorMessage}</p>}
            </div>)
    }
    return (
        <div className="w-full flex flex-col">
            {label && <label htmlFor={config?.name}>{label}</label>}
            <div className="w-full ring py-1.5 p-3 gap-2 ring-grey rounded-md flex-between">
                {prefix && <span className="size-4 flex-center">
                    <Icon icon={prefix} fontSize={20} />

                </span>}
                <input {...config}
                    className={` w-full   p-px placeholder:text-placeholder outline-none ${config?.className}`}

                />
                {suffix && <span className="size-4 flex-center">
                    <Icon icon={suffix} fontSize={20} />

                </span>}
            </div>
            {error && <p className="font-medium text-xs text-danger">{errorMessage}</p>}
        </div>
    )
}
