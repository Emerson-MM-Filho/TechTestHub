'use client';

import { createContext, useState, ReactNode, useEffect } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies"
import { useRouter } from 'next/navigation';

import { singInRequest, recoverUserInformation } from "@/service/auth";
import { api } from "@/service/api";

export type User = {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar?: string;
    isAdmin: boolean;
}

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    signIn: (data: SignInData) => Promise<void>;
    signOut: () => void;
}

type SignInData = {
    username: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'techTestBix.authToken': token } = parseCookies();

        if (!token || user) return;

        recoverUserInformation().then(user => {
            setUser(user);
        });

    }, [user]);

    async function signIn({ username, password }: SignInData): Promise<void> {
        const { token, user } = await singInRequest({ username, password });

        setCookie(undefined, 'techTestBix.authToken', token, {
            maxAge: 60 * 60 * 1, // 1 hour
        });

        api.defaults.headers['Authorization'] = `Token ${token}`;

        setUser(user);

        router.push('/dashboard');
    };

    function signOut() {
        router.push('/login');
        setUser(null);
        destroyCookie(null, 'techTestBix.authToken')
    }

    return (
            <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
                {children}
            </AuthContext.Provider>
        );
}