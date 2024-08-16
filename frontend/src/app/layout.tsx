import Header from './components/Header/Header';
import './globals.css';
import QueryProvider from './providers/QueryProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Resume builder',
	description: 'Resume builder app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<QueryProvider>
					<Header />
					{children}
				</QueryProvider>
			</body>
		</html>
	);
}
