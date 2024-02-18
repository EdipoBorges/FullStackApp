import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from '../services/errors/AuthTokenError';


//função para paginas só acessadas por usuários logados
export function canSSRAuth<P>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    //Se ele tentar acessar a pagina de login e já estiver logado, redireciona para o dashboard
    const cookies = parseCookies(ctx);

    
    const token = cookies['@nextauth.token'];

    if(!token){
      return {
        redirect: {
          destination: '/',
          permanent: false //só pra informar que é temporário
        }
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if(err instanceof AuthTokenError){
        destroyCookie(ctx, '@nextauth.token');
        destroyCookie(ctx, '@nextauth.refreshToken');
  
        return {
          redirect: {
            destination: '/',
            permanent: false //só pra informar que é temporário
          }
        };
      }
    }

  }
}
