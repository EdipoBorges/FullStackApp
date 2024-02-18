import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

//função para paginas só acessadas por visitantes em geral
//Ao restringir o tipo genérico P para ' P extends object', você está garantindo que P 
//seja qualquer tipo que seja um objeto, o que é geralmente o que se espera para as props 
//de uma página no Next.js.
export function canSSRGuest<P extends object>(fn: GetServerSideProps<P>){
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    //Se ele tentar acessar a pagina de login e já estiver logado, redireciona para o dashboard
    const cookies = parseCookies(ctx);

    if(cookies['@nextauth.token']){
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false //só pra informar que é temporário
        }
      };
    }

    return await fn(ctx);
  }
  
}