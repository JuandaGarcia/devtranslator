import Logo from 'components/Logo/Logo'
import Link from 'next/link'
import s from './Header.module.scss'

const Header = () => {
	return (
		<header className={s.header}>
			<Link className={s.header__logo} href="/" aria-label="Logo devtranslator">
				<Logo />
			</Link>
		</header>
	)
}

export default Header
