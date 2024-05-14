import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './_components/header/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Resume builder',
	description: 'Resume builder app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Header />
				{children}
				<footer>footer</footer>
			</body>
		</html>
	);
}
