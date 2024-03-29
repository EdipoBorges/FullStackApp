import { useContext, FormEvent, useState} from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/home.module.scss";

import logoImg from "../../public/logo.svg";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "react-toastify";

import { AuthContext } from "@/contexts/AuthContext";

import Link from "next/link";

import { canSSRGuest } from "@/utils/canSSRGuest";


export default function Home() {
  const {signIn} = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent){
    event.preventDefault();

    if(email === "" || password === ""){
      toast.info("Preencha todos os campos");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    };

    await signIn(data);

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Rede De Contatos - Faça seu Login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Rede de Contatos" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <h1>Faça seu Login</h1>
            <Input placeholder="Digite seu Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <Input placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <Button
            type="submit"
            Loading={loading}
            >Acessar</Button>
            
          </form>

          <Link href={"/singup"}>  
          <span className={styles.text}>Não possui uma conta? Cadastre-se</span>
          </Link>                  
          

        </div>{/*<h1>Sujeito ;-)</h1>*/}
      </div>
    </>
  );
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
}
);
