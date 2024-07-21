import useElementSize from 'lib/useElementSize'
import createSVGMask from 'lib/createSVGMask'
import { useMotionValue } from 'framer-motion'

const useGlowingButton = () => {
	const [buttonRef, { width, height }] = useElementSize()
	const turn = useMotionValue('0turn')

	function generateSquareMask() {
		const dimensions = width + 50 // safe distance

		return dimensions
	}

	const squareMask = generateSquareMask()
	const decoratorsStyles = {
		'--border-angle': turn,
		bottom: `calc(50% - ${squareMask / 2}px)`,
		left: `calc(50% - ${squareMask / 2}px)`,
		width: `${squareMask}px`,
		height: `${squareMask}px`,
		mask: `url(${createSVGMask(
			width + 4,
			height + 4
		)}) center center no-repeat alpha`,
		maskSize: `${width + 4}px ${height + 4}px`,
	}

	return { buttonRef, decoratorsStyles, turn }
}

export default useGlowingButton
