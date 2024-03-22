import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '@/contexts/AuthContext';

export function Header() {

    const { signOut } = useContext(AuthContext);

    return (
        <header className={styles.headerContainer}>
        <div className={styles.headerContent}   >
            <Link href='/dashboard'>
                <img src="/logo.svg" width={120} height={60} alt="Agregador de Contatos" />
            </Link>

            

            <nav className={styles.menuNav}>
                <Link href='/category'>
                    Categoria
                </Link>
                <Link href='/contacts'>
                    Contatos
                </Link>

                <button onClick={signOut}>
                    <FiLogOut color='#3fffa3' size={20} />
                </button>
                
            </nav>

        </div>
        </header>
    )
}