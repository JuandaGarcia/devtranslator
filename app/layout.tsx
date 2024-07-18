import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AppLayout from 'components/AppLayout/AppLayout'

const inter = Inter({ subsets: ['latin'] })

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
			<body className={inter.className}>
				<AppLayout>{children}</AppLayout>
			</body>
		</html>
	)
}
