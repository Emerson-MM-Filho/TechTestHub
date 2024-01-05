import { AxiosResponse } from "axios";
import { api } from "./api";
import { Position } from "./company";

const EMPLOYEE_URL = '/api/employee/';

export type Employee = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    position?: Position;
    join_date: string;
    leave_date?: string;
}

export type Vacation = {
    id: number;
    start_date: string;
    end_date: string;
}

export type CreateEmployeeRequestDataType = {
    name: string;
    email: string;
    avatar?: string;
    position?: number;
    join_date: string;
    leave_date?: string;
}

export type UpdateEmployeeRequestDataType = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    position?: number;
    join_date: string;
    leave_date?: string;
}


export async function CreateEmployeeRequest(employeeData: CreateEmployeeRequestDataType): Promise<Employee> {
    const formData = new FormData();
    Object.entries(employeeData).forEach(([key, value]) => {
        formData.append(key, value);
    });

    const response = await api.post(EMPLOYEE_URL, formData);

    return response.data;
}

export async function UpdateEmployeeRequest(employee: UpdateEmployeeRequestDataType): Promise<Employee> {
    const formData = new FormData();
    Object.entries(employee).forEach(([key, value]) => {
        if (key === 'position') {
            value = (value as Position).id;
        }

        formData.append(key, value);
    });

    const response = await api.put(`${EMPLOYEE_URL}${employee.id}/`, formData);

    return response.data;
}

export async function ListEmployeesRequest(): Promise<Employee[]> {
    const response = await api.get(EMPLOYEE_URL);

    return response.data;
}

export async function DeleteEmployeeRequest(employee: Employee): Promise<AxiosResponse> {
    return await api.delete(`${EMPLOYEE_URL}${employee.id}`);
}


export async function ListEmployeeVacationsRequest(employee: Employee): Promise<AxiosResponse> {
    return await api.get(`${EMPLOYEE_URL}${employee.id}/vacations/`);
}