import type { Metadata } from 'next'
import './globals.css'
import AppLayout from 'components/AppLayout/AppLayout'

export const metadata: Metadata = {
	title: 'DevTranslator',
	description:
		'Convierte código fácilmente entre diferentes lenguajes de programación con DevTranslator. Soporta JavaScript, Python, Java, C++, y más. Simplifica tu trabajo de desarrollo con conversiones rápidas y precisas.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<AppLayout>{children}</AppLayout>
		</html>
	)
}
