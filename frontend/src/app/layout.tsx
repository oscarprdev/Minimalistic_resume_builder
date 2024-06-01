import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './_components/header/Header';
import QueryProvider from '@/providers/queryProvider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

import Link from 'next/link';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconBrandX } from '@tabler/icons-react';

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
					<footer className='w-[750px] mx-auto pt-4 pb-10 flex items-center justify-between text-gray-400'>
						<p className='text-sm '>Developed by Oscar Perez Romero</p>
						<div className='flex items-center gap-2'>
							<Link
								href={'https://github.com/oscarprdev'}
								target='blank'
								className='hover:text-gray-600 duration-200'>
								<IconBrandGithub size={20} />
							</Link>
							<Link
								href={'https://github.com/oscarprdev'}
								target='blank'
								className='hover:text-gray-600 duration-200'>
								<IconBrandX size={20} />
							</Link>
						</div>
					</footer>
					<Toaster />
				</QueryProvider>
			</body>
		</html>
	);
}
