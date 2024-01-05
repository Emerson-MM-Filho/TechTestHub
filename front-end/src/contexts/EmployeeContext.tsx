'use client';

import { createContext, useState, ReactNode } from "react";

import {
    Employee,
    Vacation,
    UpdateEmployeeRequestDataType,
    CreateEmployeeRequestDataType,
    ListEmployeesRequest,
    ListEmployeeVacationsRequest,
    CreateEmployeeRequest,
    UpdateEmployeeRequest,
    DeleteEmployeeRequest,
} from "@/service/employee";

type EmployeeContextType = {
    employees: Employee[] | null;
    createEmployee: (data: CreateEmployeeRequestDataType) => Promise<Employee>;
    ListEmployees: () => Promise<Employee[]>;
    UpdateEmployees: (employees: Employee[]) => void;
    listingEmployees: boolean;
    updatingEmployees: boolean;
    setEmployees: (employees: Employee[]) => void;
    UpdateEmployee: (data: UpdateEmployeeRequestDataType) => Promise<Employee>;
    DeleteEmployee: (employee: Employee) => Promise<void>;
    ListEmployeeVacations: (employee: Employee) => Promise<Vacation[]>;
}

type EmployeeProviderProps = {
    children: ReactNode;
    startEmployees: Employee[] | null;
}

export const EmployeeContext = createContext({} as EmployeeContextType);

export function EmployeeProvider({ children, startEmployees }: EmployeeProviderProps) {
    const [employees, setEmployees] = useState<Employee[] | []>(startEmployees ? startEmployees : []);
    const [listingEmployees, setListingEmployees] = useState<boolean>(false);
    const [updatingEmployees, setUpdatingEmployees] = useState<boolean>(false);

    // merge with the existing employees (check if the employee already exists in the list)
    const UpdateEmployees = (newEmployees: Employee[]) => {
        setUpdatingEmployees(true);
        const updatedEmployees = newEmployees.reduce((acc, employee) => {
            if (!acc.find((e) => e.id === employee.id)) {
                acc = [...acc, employee];
            } else {
                acc = acc.filter((e) => e.id !== employee.id);
                acc = [...acc, employee];
            }
            return acc;
        }, employees);
        setEmployees((updatedEmployees) => {
            return updatedEmployees
        });
        setUpdatingEmployees(false);
    }

    async function UpdateEmployee(data: UpdateEmployeeRequestDataType): Promise<Employee> {
        return await UpdateEmployeeRequest(data);
    }

    async function createEmployee(data: CreateEmployeeRequestDataType): Promise<Employee> {
        const employee = await CreateEmployeeRequest(data);
        UpdateEmployees([employee]);
        return employee;
    };

    async function ListEmployees(): Promise<Employee[]> {
        setListingEmployees(true);

        const employees = await ListEmployeesRequest();
        UpdateEmployees(employees);

        setListingEmployees(false);
        return employees;
    }

    async function DeleteEmployee(employee: Employee): Promise<void> {
        await DeleteEmployeeRequest(employee);
        const newEmployees = employees.filter((e) => e.id !== employee.id);
        setEmployees(newEmployees);
    }

    async function ListEmployeeVacations(employee: Employee): Promise<Vacation[]> {
        const response = await ListEmployeeVacationsRequest(employee);
        return response.data as Vacation[];
    }

    return (
        <EmployeeContext.Provider value={{ employees, createEmployee, ListEmployees, UpdateEmployees: UpdateEmployees, listingEmployees, updatingEmployees, setEmployees, UpdateEmployee, DeleteEmployee, ListEmployeeVacations }}>
            {children}
        </EmployeeContext.Provider>
    );
}
