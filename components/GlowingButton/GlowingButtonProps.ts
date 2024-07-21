import { ButtonHTMLAttributes } from 'react'

export interface GlowingButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	noStar?: boolean
	children?: React.ReactNode
	fullWidth?: boolean
}
