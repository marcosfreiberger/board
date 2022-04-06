import Link from 'next/link'
import Image from 'next/image'
import { SignInButton } from '../SignInButton'

import styles from './styles.module.scss'
import logo from '../../../public/images/logo.svg'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a>
            <Image src={logo} alt="Logo meu board" />
          </a>
        </Link>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/board">
            <a>Meu board</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}