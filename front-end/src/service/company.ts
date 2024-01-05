import { api } from "./api";

const COMPANY_URL = '/api/company/';

export type Position = {
    id: number;
    name: string;
}

export type Company = {
    id: number;
    name: string;
    positions?: Position[];
}

export async function GetCompanyRequest(): Promise<Company> {
    const response = await api.get(COMPANY_URL);

    const company = response.data[0];
    return company;
}
