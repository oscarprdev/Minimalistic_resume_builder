import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import Header from './_components/header/Header';
import { cn } from '@/lib/utils';
import ToastWrapper from './_containers/ToastWrapper';

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
				<ToastWrapper>
					<Header />
					{children}
				</ToastWrapper>
			</body>
		</html>
	);
}
