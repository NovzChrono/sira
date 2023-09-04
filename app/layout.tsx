import './globals.css'
import type { Metadata } from 'next'
import {  Nunito } from 'next/font/google'

import NavBar from "@/app/components/navbar/NavBar";
import ClientOnly from "@/app/components/ClientOnly";
import ToasterProvider from "@/app/providers/ToasterProvider";

import getCurrentUser from "@/app/actions/getCurrentUser";

import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import RentModal from "@/app/components/modals/RentModal";

export const metadata: Metadata = {
  title: 'Sira',
  description: 'Booking Application',
}

const font = Nunito({
  subsets : ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
      <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <RentModal />
        <NavBar currentUser={currentUser} />
      </ClientOnly>
      <div className='pb-20 pt-28'>
        {children}
      </div>
      </body>
    </html>
  )
}
