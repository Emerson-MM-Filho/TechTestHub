import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { AxiosError } from 'axios';

import { Employee, ListEmployeesRequest } from '@/service/employee';
import { Company, GetCompanyRequest } from '@/service/company';
import EmployeesTable from '@/components/employeeTable';
import EmployeeLayout from './layout';
import { api } from "@/service/api";

async function ListEmployees(): Promise<Employee[]> {
    const cookieStore = cookies()
    const token = cookieStore.get('techTestBix.authToken')

    if (!token) return redirect('/login');

    api.defaults.headers['Authorization'] = `Token ${token.value}`;

    try {
        return await ListEmployeesRequest()
    } catch (error) {
        if (error instanceof AxiosError) {
            const { response } = error as AxiosError
            if (response && response.status === 401) {
                // redirect to login page
                console.log('User unauthenticated')
                return redirect('/login')
            }
        }
        throw error
    }
}

async function GetCompany(): Promise<Company> {
    const cookieStore = cookies()
    const token = cookieStore.get('techTestBix.authToken')

    if (!token) return redirect('/login');

    api.defaults.headers['Authorization'] = `Token ${token.value}`;

    try {
        const _return = await GetCompanyRequest()
        return _return
    } catch (error) {
        if (error instanceof AxiosError) {
            const { response } = error as AxiosError
            if (response && response.status === 401) {
                // redirect to login page
                console.log('User unauthenticated')
                return redirect('/login')
            }
        }
        throw error
    }
}

const Page = async () => {
    const employees = await ListEmployees()
    const company = await GetCompany()

    return (
        <>
            <EmployeeLayout company={company} employees={employees}>
                <EmployeesTable/>
            </EmployeeLayout>
        </>
    );
};

export default Page;
