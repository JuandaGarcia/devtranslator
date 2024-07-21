import { useRef } from 'react'
import s from './UserCard.module.scss'
import { useInView } from 'framer-motion'

export default function UserCard() {
	const ref = useRef<HTMLAnchorElement | null>(null)
	const isInView = useInView(ref, { once: true })

	return (
		<a
			href="https://github.com/JuandaGarcia"
			target="_blank"
			rel="noopener noreferrer"
			className={s.credits__item}
			ref={ref}
			data-animate={isInView}
		>
			<img
				src="/img/profile.png"
				width={48}
				height={48}
				style={{ borderRadius: '50%' }}
				alt="Juanda Garcia profile picture"
			/>
			<div>
				<p>Creado por</p>
				<p>@juandagarcia</p>
			</div>
		</a>
	)
}
