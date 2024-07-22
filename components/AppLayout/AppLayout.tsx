'use client'
import Stars from 'components/Stars/Stars'
import { PropsWithChildren, useEffect, useState } from 'react'
import s from './AppLayout.module.scss'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import { Inter } from 'next/font/google'
import ASCII from 'utils/ASCII'

const inter = Inter({ subsets: ['latin'] })

const BACKGROUNDS = ['#020308', '#010609', '#0B020D', '#090401', '#010902']

export default function AppLayout({ children }: PropsWithChildren) {
	const [bg, setBg] = useState(0)

	useEffect(() => {
		const bgTimeOut = setTimeout(() => {
			const newBg = bg < BACKGROUNDS.length - 1 ? bg + 1 : 0
			setBg(newBg)
		}, 10000)

		return () => clearTimeout(bgTimeOut)
	}, [bg])

	useEffect(() => ASCII(), [])

	return (
		<body
			className={`${s.layout} ${inter.className}`}
			style={{
				background: `radial-gradient(63.94% 63.94% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), ${BACKGROUNDS[bg]}`,
			}}
		>
			<Header />
			{children}
			<Footer />
			<Stars />
			{/* <motion.div
				className={s.layout__alert}
				initial={{ opacity: 0, y: 100 }}
				animate={
					true
						? {
								opacity: 1,
								y: 0,
						  }
						: {
								opacity: 0,
								y: 100,
						  }
				}
				transition={{
					duration: 0.6,
				}}
			>
				<span>Move away your cursor to see the magic ✨</span>
			</motion.div> */}
		</body>
	)
}
