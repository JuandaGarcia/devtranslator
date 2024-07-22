import { useCallback, useState, useEffect } from 'react'

interface Size {
	width: number
	height: number
}

function useElementSize(): [(node: HTMLElement | null) => void, Size] {
	// Mutable values like 'ref.current' aren't valid dependencies
	// because mutating them doesn't re-render the component.
	// Instead, we use a state as a ref to be reactive.
	const [ref, setRef] = useState<HTMLElement | null>(null)
	const [size, setSize] = useState<Size>({
		width: 0,
		height: 0,
	})

	// Prevent too many rendering using useCallback
	const handleSize = useCallback(() => {
		setSize({
			width: ref?.offsetWidth || 0,
			height: ref?.offsetHeight || 0,
		})
	}, [ref?.offsetHeight, ref?.offsetWidth])

	useEffect(() => {
		document.addEventListener('resize', handleSize)
		return () => {
			document.removeEventListener('resize', handleSize)
		}
	}, [handleSize])

	useEffect(() => {
		handleSize()
	}, [handleSize])

	useEffect(() => {
		handleSize()
	}, [ref?.offsetHeight, ref?.offsetWidth, handleSize])

	return [setRef, size]
}

export default useElementSize
