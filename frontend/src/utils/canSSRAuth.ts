import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/erros/AuthTokenError";


//função para paginas só acessadas por usuários logados
export function canSSRAuth<P extends object>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    //Se ele tentar acessar a pagina de login e já estiver logado, redireciona para o dashboard
    const cookies = parseCookies(ctx);
    
    const token = cookies['@nextauth.token'];

    if(!token){
      return {
        redirect:{
          destination: '/',
          permanent: false //só pra informar que é temporário
        }
      }
    }

    try{
      return await fn(ctx);
    }catch(err){
      if(err instanceof AuthTokenError){
        destroyCookie(ctx, '@nextauth.token');
        return{
          redirect:{
            destination: '/',
            permanent: false
          }
        }
      }
    }

    //adicionado um retorno em caso de outros erros ----
    return {
      props: {} as P,
      notFound: true,
    };    
  }
}
