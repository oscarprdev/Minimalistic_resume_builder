import Header from './components/Header/Header';
import { Toaster } from './components/ui/toaster';
import './globals.css';
import QueryProvider from './providers/QueryProvider';
import type { Metadata } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Resume builder',
	description: 'Resume builder app',
};

export default function RootLayout({ children, session }: { children: ReactNode; session: Session }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<QueryProvider>
						<Header />
						{children}
						<Toaster />
					</QueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
