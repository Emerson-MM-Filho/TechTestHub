import { useEffect, useState } from "react";

import { Employee, ListEmployeeVacationsRequest, Vacation } from "@/service/employee";

const EmployeeVacationTimeline = ({ employee }: { employee: Employee }) => {

    const [ vacations, setVacations ] = useState<Vacation[]>([]);

    useEffect(() => {
        ListEmployeeVacationsRequest(employee)
        .then( response => {
            const vacations = response.data;
            setVacations(vacations);
        })
    }, [])

    return (
        <ol className="relative border-l border-gray-200 dark:border-gray-900">
            {
                vacations.map( vacation => (
                    <li className="mb-10 ml-4" key={vacation.id}>
                        <div
                            className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                        </div>
                        <span
                            className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                        >
                            Required Vacation
                        </span>
                        <h3
                            className="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            End's in {vacation.end_date}
                        </h3>
                        <div
                            className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700">
                        </div>
                        <span
                            className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"
                        >
                            Required Vacation
                        </span>
                        <h3
                            className="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Start's in {vacation.start_date}
                        </h3>
                    </li>
                ) )
            }            
        </ol>
    )
};

export default EmployeeVacationTimeline;