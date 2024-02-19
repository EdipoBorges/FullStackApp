import styles from './styles.module.scss';
import Link from 'next/link';

import { FiLogOut } from 'react-icons/fi';

export function Header() {
    return (
        <header className={styles.headerContainer}>
        <div className={styles.headerContent}   >
            <Link href='/dashboard'>
                <img src="/logo.svg" width={120} height={60} alt="Agregador de Contatos" />
            </Link>

            <nav className={styles.menuNav}>
                <Link href='/category'>
                    Category
                </Link>
                <Link href='/contacts'>
                    Contatos
                </Link>

                <button>
                    <FiLogOut color='#fff' size={20} />
                </button>
                
            </nav>

        </div>
        </header>
    )
}