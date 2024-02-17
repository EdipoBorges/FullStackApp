import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";

import logoImg from "../../public/logo.svg";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";


export default function Home() {
  return (
    <>
      <Head>
        <title>Rede De Contatos - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Rede de Contatos" />
        <div className={styles.login}>
          <form>
            <h1>Faça seu login Meu Jovem</h1>
            <Input placeholder="Digite seu Email"
            type="text"
            />
            <Input placeholder="Digite sua senha"
            type="password"
            />
            <Button/>
          </form>
        </div>{/*<h1>Sujeito ;-)</h1>*/}
      </div>
    </>
  );
}