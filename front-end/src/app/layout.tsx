'use client';

import './globals.css'
import 'flowbite';

import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className='flex flex-col min-h-screen dark:bg-gray-900'>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
