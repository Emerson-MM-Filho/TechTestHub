'use client';

import { useContext, useState } from 'react';
import { Modal } from 'flowbite-react';
import Image from 'next/image';

import EmployeeVacationTimeline from './employeeVacationTimeline';
import { AuthContext } from '@/contexts/AuthContext';
import AvatarPlaceholder from './avatarPlaceholder';
import { Employee } from '@/service/employee';
import EmployeeForm from './employeeForm';


const EmployeeTableRow = ({ employee } : { employee: Employee }) => {
    const [ openFormModal, setOpenFormModal ] = useState<boolean>(false);
    const [ openVacationModal, setOpenVacationModal ] = useState<boolean>(false);

    const { user } = useContext(AuthContext)

    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={employee.id}>
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                    </div>
                </td>
                <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white w-max">
                    {
                        !employee.avatar ?
                        (
                            <AvatarPlaceholder/>
                        ) : (
                            <Image src={employee.avatar} alt={`${employee.name} avatar`} width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized={true} />
                        )
                    }
                    <div className="pl-3">
                        <div className="text-base font-semibold">{employee.name}</div>
                        <div className="font-normal text-gray-500">{employee?.email}</div>
                    </div>  
                </td>
                <td className="px-6 py-4">
                    {employee.position?.name || '-'}
                </td>
                <td className="px-6 py-4">
                    {
                        !employee.leave_date ?
                        (
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                Active
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                Dropped
                            </div>
                        )
                    }
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {employee.join_date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    {employee.leave_date || '-'}
                </td>
                <td className="px-6 py-4">
                    <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => setOpenFormModal(true)}
                    >
                        {user?.isAdmin ? 'Edit' : 'View'}
                    </button>
                    <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline ml-1"
                        onClick={() => setOpenVacationModal(true)}
                    >
                        Vacations
                    </button>
                </td>
            </tr>
            <Modal dismissible show={openFormModal} onClose={() => setOpenFormModal(false)}>
                <Modal.Header>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Update Employee
                    </span>
                </Modal.Header>
                <Modal.Body>
                    <EmployeeForm employee={employee} onSubmit={() => setOpenFormModal(false)}/>
                </Modal.Body>
            </Modal>
            <Modal dismissible show={openVacationModal} onClose={() => setOpenVacationModal(false)}>
                <Modal.Header>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Vacations
                    </span>
                </Modal.Header>
                <Modal.Body className='flex items-center justify-center'>
                    <EmployeeVacationTimeline employee={employee}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EmployeeTableRow;
