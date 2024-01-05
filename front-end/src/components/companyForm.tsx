'use client';

import { useForm } from 'react-hook-form';
import { useContext } from "react";

import { CompanyContext } from "@/contexts/CompanyContext";
import { api } from "@/service/api";
import { AuthContext } from '@/contexts/AuthContext';

type FormValues = {
    name: string
}

const CompanyForm = () => {
    const { company, setCompany } = useContext(CompanyContext)
    const { user } = useContext(AuthContext)
    const { register, handleSubmit } = useForm<FormValues>({ defaultValues: { name: company.name } });


    const updateCompany = async ({ name }: FormValues) => {
        const response = await api.put(`/api/company/${company.id}/`, { name })
        if (response.status === 200) {
            setCompany(response.data)
        }
    }

    const handleSubmitCompany = ({ name }: FormValues) => {
        updateCompany({ name })
        alert('Company updated')
    };

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitCompany)}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company Name</label>
                        <input
                            {...register('name')}
                            type="text"
                            placeholder="Company name"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            readOnly={!user?.isAdmin}
                        />
                    </div>
                </div>
                {
                    user?.isAdmin && (
                        <button
                            type="submit"
                            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                        >
                            Save
                        </button>
                    )
                }
            </form>
        </>
    );
};

export default CompanyForm;
