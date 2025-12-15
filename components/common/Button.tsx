import { ICON } from '@/utils/icon-exports'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import  { type PropsWithChildren, ButtonHTMLAttributes } from 'react'

type BUTTON_VARIANTS = | "primary" | "secondary" | "outlined" | "danger"

type BUTTON_SIZE = | "small" | "medium" | "regular" | "large" | "full"

interface ButtonProps extends PropsWithChildren {
  config?: ButtonHTMLAttributes<HTMLButtonElement>
  size?: BUTTON_SIZE,
  variants?: BUTTON_VARIANTS,
  isLoading?: boolean
  icon?: string
  link?: boolean
  href?: string
}

const base = `transition-all rounded-md ease-in duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-70 cursor-pointer flex-center gap-3`

const VARIANT_STYLES: Record<NonNullable<BUTTON_VARIANTS>, string> = {
  primary: "bg-primary text-white",
  danger: "bg-danger text-white",
  secondary: "",
  outlined: "bg-white ring ring-grey",

}

const SIZES: Record<NonNullable<BUTTON_SIZE>, string> = {
  small: "",
  medium: "",
  regular: "",
  large: "",
  full: "py-4 px-3 w-full"
}




export default function Button({ children, config, icon, isLoading, variants = "primary", size = "regular", link, href }: ButtonProps) {


  if (link && href) return <Link href={href}
    className={`${base} ${SIZES[size]} ${VARIANT_STYLES[variants]} ${config?.className}`}

  >
    {icon && <Icon icon={icon} fontSize={21} />}
    {children}
  </Link>


  return (
    <button {...config}
      type={config?.type ?? "button"}
      disabled={isLoading || config?.disabled}
      className={`${base} ${SIZES[size]} ${VARIANT_STYLES[variants]} ${config?.className}`}
    >
      {isLoading ? <Icon icon={ICON.SPINNER} className='animate-spin' fontSize={21} /> :
        <>
          {icon && <Icon icon={icon} fontSize={21} />}
          {children}
        </>
      }
    </button>
  )
}
