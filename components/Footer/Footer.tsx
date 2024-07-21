'use client'
import Signature from 'components/Signature/Signature'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import s from './Footer.module.scss'
import UserCard from 'components/UserCard/UserCard'

const Footer = () => {
	const ref = useRef<HTMLElement | null>(null)
	const isInView = useInView(ref, {
		once: true,
		margin: '100px',
	})
	return (
		<footer ref={ref} className={s.footer} data-animate={isInView}>
			<UserCard />
			<Signature />
		</footer>
	)
}

export default Footer
