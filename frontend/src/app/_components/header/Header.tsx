'use server';

import Link from 'next/link';
import AuthButton from '../buttons/AuthButton';
import DownloadResumeButton from '../buttons/DownloadResumeButton';

const Header = () => {
	return (
		<header className='bg-white py-4 px-10 border-b border-b-gray-200 shadow-b-lg flex items-center justify-between'>
			<Link href={'/'}>Resume builder</Link>
			<DownloadResumeButton />
			<AuthButton />
		</header>
	);
};

export default Header;
