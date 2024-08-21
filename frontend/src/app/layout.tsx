import { Toaster } from './components/ui/toaster';
import './globals.css';
import QueryProvider from './providers/QueryProvider';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'MRB - Minimalistic resume builder',
	description: 'Minimalistic resume builder app',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
	params: { session },
}: {
	children: ReactNode;
	params: { session: Session };
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<QueryProvider>
						{children}
						<Toaster />
					</QueryProvider>
				</SessionProvider>
				<Analytics />
			</body>
		</html>
	);
}
