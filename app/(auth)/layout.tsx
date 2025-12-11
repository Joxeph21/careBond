import Logo from "@/components/common/Logo"
import Image from "next/image"
import type { PropsWithChildren } from "react"

export default function AuthLayout({ children }: PropsWithChildren) {
    return <section className="w-full h-full py-20 px-4 col-center gap-8 min-h-screen relative">
        <Image src={"/pattern.png"} className="-z-1 select-none pointer-events-none" aria-hidden fill alt="" />
        <Logo />
        <main className="py-10 px-6 md:px-10 z-1  max-w-[448px] bg-white w-full rounded-2xl ring ring-grey">

            {children}
        </main>
        <footer className="absolute bottom-2 p-3 text-center">
            <p>Copyright @{new Date().getFullYear()} - CareBond</p>
        </footer>
    </section>
}