import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '@/components/Header';

import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Contact() {
    return (
        <>
        <Head>
            <title>Novo Contato - Agregador de Contatos</title>
        </Head>
        <div>
            <Header />

            <main className={styles.container}>
                <h1>Cadastrar Novo Contato</h1>

                <form className={styles.form}>
                    <select>
                        <option>Negocio</option>
                        <option>Lazer</option>
                    </select>

                    <input type="text" 
                    placeholder="Digite o Nome do Contato" 
                    className={styles.input}
                    />
                    <input type="text" 
                    placeholder="Valor" 
                    className={styles.input}
                    />
                    <textarea 
                    placeholder="Descrição"
                    className={styles.input} 
                    />

                    <button type="submit" className={styles.button}>
                        Cadastrar
                    </button>

                </form>
            </main>
        </div>
        </>
    );
    }

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
});