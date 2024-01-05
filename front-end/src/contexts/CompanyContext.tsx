'use client';

import { createContext, useState, ReactNode } from "react";
import { Company, GetCompanyRequest } from "@/service/company";

type CompanyContextType = {
    company: Company;
    setCompany: (company: Company) => void;
    GetCompany: () => Promise<Company>;
}

type CompanyProviderProps = {
    children: ReactNode;
    startCompany: Company;
}

export const CompanyContext = createContext({} as CompanyContextType);

export function CompanyProvider({ children, startCompany }: CompanyProviderProps) {
    const [company, setCompany] = useState<Company>(startCompany);

    async function GetCompany(): Promise<Company> {
        const company = await GetCompanyRequest();
        return company;
    }

    return (
        <CompanyContext.Provider value={{ company, setCompany, GetCompany }}>
            {children}
        </CompanyContext.Provider>
    );
}