'use server';

import Link from 'next/link';
import AuthButton from '../buttons/AuthButton';
import DownloadResumeButton from '../buttons/DownloadResumeButton';
import { useUserLogged } from '@/hooks/useUserLogged';
import AuthSection from './AuthSection';

const Header = async () => {
	const user = await useUserLogged();

	return (
		<header className='bg-white py-4 px-10 border-b border-b-gray-200 shadow-b-lg flex items-center justify-between'>
			<Link href={'/'}>Resume builder</Link>
			<div className='flex items-center gap-2'>
				<DownloadResumeButton user={user} />
				<AuthSection user={user} />
			</div>
		</header>
	);
};

export default Header;
