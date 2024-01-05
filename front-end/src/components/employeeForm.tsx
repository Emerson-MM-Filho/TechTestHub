'use client';

import { useContext, useState } from "react";
import { useForm } from 'react-hook-form';
import Image from 'next/image';

import { EmployeeContext } from '@/contexts/EmployeeContext';
import { CompanyContext } from '@/contexts/CompanyContext';
import { AuthContext } from '@/contexts/AuthContext';
import AvatarPlaceholder from './avatarPlaceholder';
import { Employee } from '@/service/employee';


type FormValues = {
    name: string;
    email: string;
    avatar?: string;
    position?: number;
    join_date: string;
    leave_date: string;
}


const EmployeeForm = ({ employee, onSubmit }: { employee?: Employee, onSubmit?: () => void }) => {

    const { createEmployee, UpdateEmployee, DeleteEmployee  } = useContext(EmployeeContext);
    const { company } = useContext(CompanyContext)
    const { user } = useContext(AuthContext)

    const { register, handleSubmit, getValues } = useForm<FormValues>({
        defaultValues: {
            name: employee?.name,
            email: employee?.email,
            position: employee?.position?.id,
            join_date: employee?.join_date,
            leave_date: employee?.leave_date || '',
        }
    });

    const handleSubmitCompany = (employeeData: FormValues) => {
        const data = {...employeeData} as any;

        // Adjust the avatar data
        // file input returns a FileList object, which is an array of File objects
        // we only want the first one
        if (employeeData.avatar && employeeData.avatar.length > 0) {
            data.avatar = employeeData.avatar[0];
        } else {
            // if the user has not selected a new avatar, we don't want to send the avatar field
            delete data.avatar;
        }

        if (employee) {
            data.id = employee.id;
            const _return = UpdateEmployee(data);
            onSubmit && onSubmit();
            return _return;
        }

        const _return = createEmployee(data);
        onSubmit && onSubmit();
        return _return;
    };

    const [imagePreview, setImagePreview] = useState<string | undefined>(employee?.avatar);

    return (
        <>
            <form onSubmit={handleSubmit(handleSubmitCompany)}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="avatar">Avatar</label>
                        {
                            imagePreview ? (
                                <Image
                                    src={ imagePreview }
                                    alt="avatar"
                                    width={100}
                                    height={100}
                                    className="rounded-full mt-4 mb-2"
                                    unoptimized={true}
                                />
                            ) : (
                                <AvatarPlaceholder />
                            )
                        }
                        <input
                            {...register('avatar')}
                            disabled={!user?.isAdmin}
                            type="file"
                            onChange={(e) => {
                                if (!e.target.files) return;
                                setImagePreview(URL.createObjectURL(e.target.files[0]));
                            }}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                    </div>
                    <div className='flex flex-col justify-end'>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input
                            {...register('name')}
                            readOnly={!user?.isAdmin}
                            type="text"
                            placeholder="Employee name"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                            {...register('email')}
                            readOnly={!user?.isAdmin}
                            type="email"
                            placeholder="Employee email"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                        <select
                            {...register('position')}
                            disabled={!user?.isAdmin}
                            defaultValue=''
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        >
                            <option value=''>Select Position</option>
                            {
                                company?.positions?.map((position) => (
                                    <option value={position.id} key={position.id}>{position.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="join_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Join Date</label>
                        <input
                            {...register('join_date')}
                            readOnly={!user?.isAdmin}
                            type="date"
                            placeholder="Join Date"
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="leave_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leave Date</label>
                        <input
                            {...register('leave_date')}
                            readOnly={!user?.isAdmin}
                            type="date"
                            placeholder="Leave Date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        />
                    </div>
                </div>
                {
                    user?.isAdmin && (
                        <>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                {employee?.id ? 'Update' : 'Create'}
                            </button>
                            {
                                employee && (
                                    <div
                                        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer"
                                        onClick={() => (
                                            DeleteEmployee(employee),
                                            onSubmit && onSubmit()
                                        )}
                                    >
                                        Delete
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </form>
        </>
    );
};

export default EmployeeForm;
