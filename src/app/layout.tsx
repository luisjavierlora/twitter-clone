import '../assets/globals.css' 
import { Open_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import NextAuthProvider from '@/context/next-auth-provider'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Clon de twitter',
  description: 'Generado por luis',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



  return (
    <html lang="en">
      <body className={font.className}>
        <NextAuthProvider> 
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
