import type { ReactNode } from "react";
import DashboardHeader from "@/components/dashboardHeader"


const DashboardLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en" className='dark'>
    <body className='flex flex-col min-h-screen dark:bg-gray-900'>
      <DashboardHeader/>
      <div className="p-4 sm:ml-64 mt-[81px]">
        {children}
      </div>
    </body>
  </html>
)
export default DashboardLayout