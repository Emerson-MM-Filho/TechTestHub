/* eslint-disable react/no-unescaped-entities */

import LoginForm from '@/components/loginForm';


export default function Login() {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div className="flex flex-col justify-center">
                  <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to our Secure Login Portal</h1>
                  <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Access your account securely and manage your company's data with confidence. Our robust login system ensures the protection of your sensitive information while providing a seamless and convenient user experience. Sign in below to get started.</p>
                  <a
                    href="#formContainer"
                    className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
                  >
                    Login Now 
                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                </a>
              </div>
              <div>
                  <div id="formContainer" className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Sign in to CRUD
                      </h2>
                      <LoginForm/>
                  </div>
              </div>
          </div>
      </section>
    </>
  )
}
