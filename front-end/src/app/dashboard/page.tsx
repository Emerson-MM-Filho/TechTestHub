'use client';

import LastUpdatedsEmployees from '@/components/employeeLastUpdateds';
import { useEffect, useState } from 'react';
import { getApiClient } from '@/service/axios';
import { Employee } from '@/service/employee';

const Page = () => {

  const [employees, setEmployees] = useState<Employee[] | []>([]);
  useEffect(() => {
      const api = getApiClient();
      api.get('/api/employee').then(response => {
          setEmployees(response.data);
      })
  }, []);

  return (
    <main className="p-4 h-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div
          className="h-90"
        >
          <LastUpdatedsEmployees employees={employees}/>
        </div>
      <div
        className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
      >
      </div>
    </main>
  );
};

export default Page;
