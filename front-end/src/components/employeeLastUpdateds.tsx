import Image from 'next/image';

import AvatarPlaceholder from './avatarPlaceholder';


type Employee = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    position: string;
    join_date: string;
    leave_date?: string;
}


const LastUpdatedsEmployees = ({employees}: { employees: Employee[]}) => {
  return (
    <div className="w-full max-h-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Employees</h5>
            <a href="/dashboard/employees" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                View all
            </a>
        </div>
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {
                    employees && employees.slice(0,5).map(employee => {
                        return (
                            <li className="py-3 sm:pt-4" key={employee.id}>
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        {
                                            !employee.avatar ?
                                            (
                                                <AvatarPlaceholder/>
                                            ) : (
                                                <Image src={employee.avatar} alt={`${employee.name} avatar`} width={40} height={40} className="w-10 h-10 rounded-full object-cover" unoptimized={true} />
                                            )
                                        }
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {employee.name}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            {employee?.email}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
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
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </div>
  );
};

export default LastUpdatedsEmployees;
