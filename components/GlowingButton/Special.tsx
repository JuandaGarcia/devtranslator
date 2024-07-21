import { animate, motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef, useState, useCallback } from 'react'
import s from './GlowingButton.module.scss'
import useGlowingButton from './useGlowingButton'
import { GlowingButtonProps } from './GlowingButtonProps'

export default function GradientButton({
	noStar,
	children,
	fullWidth,
	...props
}: GlowingButtonProps) {
	const controls = useAnimationControls()
	const [duration, setDuration] = useState(6)
	const { buttonRef, decoratorsStyles, turn } = useGlowingButton()

	const prepareNextAnimation = useCallback(() => {
		animate(turn, ['0turn', '1turn'], {
			duration: duration,
			ease: 'linear',
			repeat: Infinity,
		})
	}, [duration, turn])

	useEffect(() => {
		const remaining = Number(turn.get().split('turn')[0])
		// THIS WILL ONLY WORK WITH LINEAR EASINGS
		const calculated = duration * (1 - remaining)
		// if the turn has been completed start with 0
		const currentTurn = turn.get() === '1turn' ? '0turn' : turn.get()

		controls.stop()
		animate(turn, [currentTurn, '1turn'], {
			duration: calculated || duration,
			ease: 'linear',
			onComplete() {
				prepareNextAnimation()
			},
		})
		return controls.stop
	}, [controls, duration, prepareNextAnimation, turn])

	const target = useRef<null | HTMLDivElement>(null)

	function calculateSpeed(x: number, y: number, maxSpeed = 6, minSpeed = 0.6) {
		// Pythagorean
		const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
		const speed =
			maxSpeed - (distance / (window.innerWidth / 3)) * (maxSpeed - minSpeed)
		return Math.max(Math.min(speed, maxSpeed), minSpeed)
	}

	useEffect(() => {
		const handleMouseMove = (event: any) => {
			if (target.current) {
				const rect = target.current.getBoundingClientRect()

				const relativeX = event.clientX - rect.x
				const relativeY = event.clientY - rect.y

				setDuration(calculateSpeed(relativeX, relativeY))
			}
		}

		window.addEventListener('mousemove', handleMouseMove)

		return () => {
			window.removeEventListener('mousemove', handleMouseMove)
		}
	}, [target])

	return (
		<div
			className={`${s.glowing_button} ${fullWidth ? s.fullWidth : ''}`}
			ref={target}
		>
			<motion.div
				animate={controls}
				style={decoratorsStyles}
				className={s.glowing_button__border}
			/>
			<motion.div
				animate={controls}
				style={decoratorsStyles}
				className={s.glowing_button__glow}
			/>
			{!noStar && (
				<motion.div
					animate={controls}
					style={decoratorsStyles}
					className={s.glowing_button__stars}
				/>
			)}
			<button className={s.glowing_button__button} ref={buttonRef} {...props}>
				<span>{children || 'Button'}</span>
			</button>
		</div>
	)
}
