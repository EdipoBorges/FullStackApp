import { createContext, ReactNode, useState, useEffect } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>,
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
    }

type UserProps = {
    id: string;
    name: string;
    email: string;    
}    

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try{
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/');
    }catch{
        console.log("Erro ao deslogar")
    }
}


export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps); 
    const isAuthenticated = !!user;

    useEffect(() => {
        const {'@nextauth.token': token} = parseCookies();

        if(token){
            api.get('/me').then(response => {
                const { id, name, email } = response.data;
                setUser({id, name, email});
            }).catch(() => {
                //Deslogar o usuário em caso de erro
                signOut();
            })
        }
    },[])

    async function signIn({email, password}: SignInProps){
        try {
            const response = await api.post('/session', {
                email,
                password
            })            
            //console.log(response.data);

            const { id, name, token } = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,  //Expira em 30 dias
                path: '/', //qual caminho terá acesso ao cookie
            });

            setUser({
                id,
                name,
                email
            })

            //passar para as próximas requisições o token
            api.defaults.headers['Authorization'] = `Bearer ${token}`; 

            toast.success(`Bem vindo!`);

            //redirecionar para a página de dashboard
            Router.push('/dashboard');


        } catch (err) {
            toast.error("Erro ao acessar, verifique suas credenciais");
            console.log("Erro ao acessar",err);
        }
    }

    async function signUp({name, email, password}: SignUpProps){
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })
            console.log("Cadastrado com Sucesso");
            toast.success("Conta Criada com Sucesso");

            Router.push('/');

        } catch (err) {
            toast.error("Erro ao cadastrar, verifique suas credenciais");
            console.log("Erro ao cadastrar ",err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}

//------------------------------------------------------------------------------------------------

{/* Inicialização do estado de usuário: No estado inicial, user está sendo iniciado com undefined. 
Isso pode causar problemas em componentes que dependem da existência de um objeto user, 
mesmo que esteja vazio. Uma prática comum é inicializar o estado com um objeto vazio:
-
const [user, setUser] = useState<UserProps>({} as UserProps);
ao inves de 
const [user, setUser] = useState<UserProps>();
-
Com essa alteração, a verificação isAuthenticated = !!user funcionará como esperado, 
retornando false quando o usuário não estiver autenticado e true quando houver um objeto user 
(mesmo que vazio). */}