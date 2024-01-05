import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';

import { Company, GetCompanyRequest } from '@/service/company';
import PositionsCurrents from '@/components/positionCurrents';
import PositionForm from '@/components/positionForm';
import CompanyForm from '@/components/companyForm';
import CompanyLayout from './layout';
import { api } from "@/service/api";

async function GetCompany(): Promise<Company> {
    const cookieStore = cookies()
    const token = cookieStore.get('techTestBix.authToken')

    if (!token) return redirect('/login');

    api.defaults.headers['Authorization'] = `Token ${token.value}`;

    try {
        const _return = await GetCompanyRequest()
        return _return
    } catch (error) {
        if (error instanceof AxiosError) {
            const { response } = error as AxiosError
            if (response && response.status === 401) {
                // redirect to login page
                console.log('User unauthenticated')
                return redirect('/login')
            }
        }
        throw error
    }
}

const Page = async () => {
    const company = await GetCompany()
    return (
        <CompanyLayout company={company}>
            <section className="bg-white dark:bg-gray-900">
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" data-tabs-toggle="#companyTab" role="tablist">
                        <li className="mr-2" role="company">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg" id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="false">
                                About
                            </button>
                        </li>
                        <li className="mr-2" role="company">
                            <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">Settings</button>
                        </li>
                    </ul>
                </div>
                <div id="companyTab">
                    <div
                        id="about"
                        aria-labelledby="about-tab"
                        role="tabpanel"
                        className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Company</h2>
                            <CompanyForm/>
                        </div>
                    </div>
                    <div
                        id="settings"
                        role="tabpanel"
                        aria-labelledby="settings-tab"
                        className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Positions</h2>
                            <PositionForm/>
                            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div>
                                <PositionsCurrents/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </CompanyLayout>
    );
};

export default Page;
