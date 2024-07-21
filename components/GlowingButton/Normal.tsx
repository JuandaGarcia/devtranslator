import { motion } from 'framer-motion'
import useGlowingButton from './useGlowingButton'
import s from './GlowingButton.module.scss'
import { GlowingButtonProps } from './GlowingButtonProps'

export default function NormalButton({
	children,
	noStar,
	fullWidth,
	...props
}: GlowingButtonProps) {
	const { buttonRef, decoratorsStyles } = useGlowingButton()
	const properties = {
		transition: { repeat: Infinity, duration: 6, ease: 'linear' },
		style: decoratorsStyles,
		animate: { '--border-angle': ['0turn', '1turn'] } as any,
	}

	return (
		<div className={`${s.glowing_button} ${fullWidth ? s.fullWidth : ''}`}>
			<motion.div {...properties} className={s.glowing_button__border} />
			<motion.div {...properties} className={s.glowing_button__glow} />
			{!noStar && (
				<motion.div {...properties} className={s.glowing_button__stars} />
			)}
			<button ref={buttonRef} className={s.glowing_button__button} {...props}>
				<span>{children || 'Button'}</span>
			</button>
		</div>
	)
}
