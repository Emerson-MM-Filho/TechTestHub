'use client';

import type { ReactNode } from "react";
import { CompanyProvider } from '@/contexts/CompanyContext';
import { Company } from "@/service/company";


const CompanyLayout = ({ children, company }: { children: ReactNode, company: Company }) => (
  <CompanyProvider startCompany={company}>
    {children}
  </CompanyProvider>
)
export default CompanyLayout