import { useState, FormEvent, useContext } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../../../styles/home.module.scss";

import logoImg from "../../../public/logo.svg";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

import Link from "next/link";

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent){
    event.preventDefault();

    if(name === "" || email === "" || password === ""){
      toast.error("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu Cadastro!</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Rede de Contatos" />
        <div className={styles.login}>
          <h1>Criando Sua Conta ...</h1>

          <form onSubmit={handleSignUp}>            
            <Input placeholder="Digite seu Nome"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
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