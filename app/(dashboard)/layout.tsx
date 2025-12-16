import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import React, { PropsWithChildren } from 'react'

export default function DashboardLayout({children}: Readonly<PropsWithChildren>) {
  return (
    <main className='w-full h-screen grid grid-cols-[250px_1fr] grid-rows-[80px_1fr]'>
        <Sidebar />
        <Header />
        <section className='w-full h-full bg-[#F8F8F8] overflow-y-auto row-span-2'>
            {children}
        </section>
    </main>
  )
}
