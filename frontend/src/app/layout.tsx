import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import ToastWrapper from '../components/wrappers/ToastWrapper';
import Header from '@/components/core/header/Header';
import QueryProvider from '@/providers/QueryProvider';

const inter = Lato({ weight: ['100', '300', '400', '700'], subsets: ['latin'] });

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
					<ToastWrapper>
						<Header />
						{children}
					</ToastWrapper>
				</QueryProvider>
			</body>
		</html>
	);
}
