import { motion } from 'framer-motion'
import useGlowingButton from './useGlowingButton'
import s from './GlowingButton.module.scss'
interface Props {
	noBorder?: boolean
	noStar?: boolean
}

export default function Loader(props: Props) {
	const { buttonRef, decoratorsStyles } = useGlowingButton()
	const properties = {
		transition: { repeat: Infinity, duration: 6, ease: 'linear' },
		style: decoratorsStyles,
		animate: { '--border-angle': ['0turn', '1turn'] } as any,
	}

	return (
		<div className={s.glowing_button}>
			<motion.div {...properties} className={s.glowing_button__border} />
			<motion.div {...properties} className={s.glowing_button__glow} />
			{!props.noStar && (
				<motion.div {...properties} className={s.glowing_button__stars} />
			)}
			<div
				ref={buttonRef}
				className={`${s.glowing_button__button} ${s.loader} ${
					props.noBorder && s.noBorder
				}`}
			></div>
		</div>
	)
}
