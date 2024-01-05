'use client';
          
import NoAuthHeader from '@/components/noAuthHeader'
import NoAuthFooter from '@/components/noAuthFooter';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className='flex flex-col min-h-screen dark:bg-gray-900'>
        <NoAuthHeader/>
          {children}
        <NoAuthFooter/>
      </body>
    </html>
  )
}
