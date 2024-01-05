"use client";

import { BsFillPersonFill, BsShieldLockFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AxiosError } from "axios";

import { AuthContext } from "@/contexts/AuthContext";

type FormValues = {
    username: string;
    password: string;
};

export default function LoginForm() {
    const { register, handleSubmit } = useForm<FormValues>();
    const { signIn } = useContext(AuthContext);

    const handleSignIn = async ({ username, password }: FormValues) => {
        try {
            return await signIn({ username, password });
        } catch (error) {
            if (error instanceof AxiosError) {
                const { response } = error as AxiosError;
                if (response && response.status === 400) {
                    if (Object.keys(response.data || {}).includes("non_field_errors")) {
                        return alert("Invalid username or password");
                    }
                    throw error;
                }
            }
            throw error;
        }
    };

    return (
        <form
            id="loginForm"
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(handleSignIn)}
        >
            <div>
                <label
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="username"
                >
                    Your username
                </label>
                <div className="flex">
                    <div className="relative w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <BsFillPersonFill className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pl-10 rounded-lg"
                            type="text"
                            placeholder="username"
                            required
                            {...register("username")}
                        />
                    </div>
                </div>
            </div>
            <div>
                <label
                    className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="password"
                >
                    Your password
                </label>
                <div className="flex">
                    <div className="relative w-full">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <BsShieldLockFill className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pl-10 rounded-lg"
                            type="password"
                            placeholder="********"
                            required
                            {...register("password")}
                        />
                    </div>
                </div>
            </div>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                        id="remember"
                        aria-describedby="remember"
                        name="remember"
                        type="checkbox"
                        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />
                </div>
                <div className="ml-3 text-sm">
                    <label
                        htmlFor="remember"
                        className="font-medium text-gray-500 dark:text-gray-400"
                    >
                        Remember this device
                    </label>
                </div>
                <a
                    href="/forgot-password"
                    className="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                    Lost Password?
                </a>
            </div>
            <button
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Login to your account
            </button>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
                Not registered yet?
                <a className="text-blue-600 hover:underline dark:text-blue-500 ml-1">
                    Create account
                </a>
            </div>
        </form>
    );
}
