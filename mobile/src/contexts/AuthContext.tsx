import React, {useState, createContext, ReactNode } from "react";

import { api } from "../services/api";
import { set } from "cypress/types/lodash";

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    };

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    });

    const [loadingAuth, setLoadingAuth] = useState(false);

    const isAuthenticated = !!user.name;

   async function signIn({email, password}: SignInProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/sessions', {
                email,
                password
            });

            setUser({
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email,
                token: response.data.token
            });

            api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

            setLoadingAuth(false);
        } catch (err) {
            console.log('Erro ao Acessar', err);
            setLoadingAuth(false);
        }



    }


    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    );
}

