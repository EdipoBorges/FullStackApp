import axios, {AxiosError} from "axios";
import { parseCookies } from "nookies";
import { AuthTokenError } from "./erros/AuthTokenError";

import { signOut } from "../contexts/AuthContext";

export function setupAPIClient(ctx = undefined){
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    });

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if(error.response && error.response.status === 401){
            // qualquer erro 401 (não autorizado) deve deslogar o usuário
            if(typeof window !== 'undefined'){
                // chama funcao para deslogar o usuário
                signOut();               
            }else{
                return Promise.reject(new AuthTokenError());
            }
        }
        return Promise.reject(error);
    })
    return api;
}

{/* Adicionei a verificação "error.response &&" antes de acessar error.response.status. 
Isso garantirá que o código só tente acessar a propriedade status se error.response estiver 
definido e não for null ou undefined, evitando assim o erro apontado pelo VSCode.*/}