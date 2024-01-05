'use client';

import { useContext } from "react";
import { useForm } from 'react-hook-form';

import { CompanyContext } from "@/contexts/CompanyContext";
import { AuthContext } from '@/contexts/AuthContext';
import { Position } from "@/service/company";
import { api } from "@/service/api";

type FormValues = {
    name: string
}

const PositionForm = ({ position, onSubmit }: { position?: Position, onSubmit?: () => void }) => {

    const { company, setCompany } = useContext(CompanyContext)

    const { user } = useContext(AuthContext)

    const { register, handleSubmit, reset } = useForm<FormValues>({defaultValues: {name: position?.name}});

    const createPosition = async ({ name }: FormValues) => {
        api.post('/api/position/', {name})
        .then((response) => {
            if (response.status === 201) {
                const newCompany = {...company}
                if (!newCompany.positions) newCompany.positions = []
                newCompany.positions.push(response.data)
                setCompany(newCompany)

                reset()
            }
        })
    };

    const updatePosition = async ({ name }: FormValues) => {
        if (!position) return

        api.put(`/api/position/${position.id}/`, {name})
        .then(response => {
            if (response.status === 200) {
                const newCompany = {
                    ...company,
                    positions: company.positions ? company.positions.map(p => p.id === position.id ? response.data : p) : []
                }
                setCompany(newCompany)
            }
        })
    }
    
    const handleSubmitPosition = async ({ name }: FormValues) => {
        if (position) {
            const _return = updatePosition({name})
            onSubmit && onSubmit()
            return _return
        } else {
            const _return = createPosition({name})
            onSubmit && onSubmit()
            return _return
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitPosition)}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Positions</label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Insert a new position pame"
                        required {...register('name')}
                        readOnly={!user?.isAdmin}
                    />
                    {
                        user?.isAdmin && (
                            <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                                {
                                    position ? 'Update' : 'Save'
                                }
                            </button>
                        )
                    }
                </div>
            </div>
        </form>
    );
};

export default PositionForm;
