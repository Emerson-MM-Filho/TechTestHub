'use client';

import type { ReactNode } from "react";

import { EmployeeProvider } from '@/contexts/EmployeeContext';
import { Employee } from '@/service/employee';
import { CompanyProvider } from "@/contexts/CompanyContext";
import { Company } from "@/service/company";

const EmployeeLayout = ({ children, company, employees }: { children: ReactNode, company: Company, employees: Employee[] | null }) => (
  <CompanyProvider startCompany={company}>
    <EmployeeProvider startEmployees={employees}>
      {children}
    </EmployeeProvider>
  </CompanyProvider>
)
export default EmployeeLayout