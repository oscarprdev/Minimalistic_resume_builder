import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './_components/header/Header';
import QueryProvider from '@/providers/queryProvider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

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
			<body className={cn(inter.className, 'bg-gray-100')}>
				<QueryProvider>
					<Header />
					{children}
					<Toaster />
				</QueryProvider>
			</body>
		</html>
	);
}
