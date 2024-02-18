import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/home.module.scss";

import logoImg from "../../../public/logo.svg";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça seu Cadastro!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Rede de Contatos" />
        <div className={styles.login}>
          <form>
            <h1>Criando Sua Conta ...</h1>
            <Input placeholder="Digite seu Nome"
            type="text"
            />
            <Input placeholder="Digite seu Email"
            type="text"
            />
            <Input placeholder="Digite sua senha"
            type="password"
            />
            <Button
            type="submit"
            Loading={false}
            >Cadastrar</Button>
            
          </form>

          <Link href={"/"}>  
          <span className={styles.text}>Já possui uma conta? Faça o login!</span>
          </Link>                  
          

        </div>{/*<h1>Sujeito ;-)</h1>*/}
      </div>
    </>
  );
}