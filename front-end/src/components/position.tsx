/* eslint-disable react/no-unescaped-entities */
'use client';

import { useContext, useState } from "react";
import { Modal } from 'flowbite-react';

import { CompanyContext } from "@/contexts/CompanyContext";
import { AuthContext } from '@/contexts/AuthContext';
import PositionForm from "@/components/positionForm";
import { Position } from "@/service/company";
import { api } from "@/service/api";


const Position = ({position}: {position: Position}) => {

    const { user } = useContext(AuthContext)
    
    const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState<boolean>(false);
    const [openFormModal, setOpenFormModal] = useState<boolean>(false);
    const { company, setCompany } = useContext(CompanyContext)

    const handleDelete = () => {
        console.log('delete')
        api.delete(`/api/position/${position.id}`)
        .then(response => {
            if (response.status === 204) {
                console.log('deleted')
                const newCompany = {
                    ...company,
                    positions: company.positions ? company.positions.filter(p => p.id !== position.id) : []
                }
                console.log(newCompany)
                setCompany(newCompany)
            }
        })
    }

    const submitCallback = () => {
        setOpenFormModal(false)
    }

    return (
        <>
            <button className="relative inline-flex items-center justify-between w-full px-4 py-4 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-800 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:text-white dark:bg-gray-900 first:rounded-t-lg last:rounded-b-lg group">
                {position.name}
                {
                    user?.isAdmin && (
                        <div className='flex gap-2'>
                            <div 
                                className="hidden group-hover:block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                onClick={() => setOpenFormModal(true)}
                            >
                                Edit
                            </div>
                            <div
                                className="hidden group-hover:block text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs px-3 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                onClick={() => setOpenDeleteConfirmModal(true)}
                            >
                                Delete
                            </div>
                        </div>
                    )
                }
            </button>

            {/* Delete confirmation modal */}
            <Modal dismissible show={openDeleteConfirmModal} onClose={() => setOpenDeleteConfirmModal(false)}>
                <Modal.Body>
                    <div className="p-6 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this position?</h3>
                        <button
                            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                            onClick={
                                () => {
                                    handleDelete()
                                    setOpenDeleteConfirmModal(false)
                                }
                            }
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            onClick={() => setOpenDeleteConfirmModal(false)}
                        >
                            No, cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal dismissible show={openFormModal} onClose={() => setOpenFormModal(false)}>
                <Modal.Header>Update Position</Modal.Header>
                <Modal.Body>
                    <PositionForm position={position} onSubmit={submitCallback}/>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Position;
