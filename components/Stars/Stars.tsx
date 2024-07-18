import { motion } from 'framer-motion'
import s from './Stars.module.scss'

export default function Stars() {
	return (
		<div className={s.stars}>
			<motion.div
				className={s.stars__gradient}
				animate={{ scale: [1, 3] }}
				transition={{
					repeat: Infinity,
					originX: 1,
					originY: 0,
					duration: 10,
					repeatType: 'mirror',
				}}
			/>
		</div>
	)
}
