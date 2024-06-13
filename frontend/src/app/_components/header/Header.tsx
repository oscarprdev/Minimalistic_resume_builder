'use server';

import Link from 'next/link';
import AuthButton from '../buttons/AuthButton';

const Header = () => {
	return (
		<header className='bg-white py-5 px-10 border-b border-b-gray-200 shadow-b-lg flex items-center justify-between'>
			<Link href={'/'}>Resume builder</Link>
			<AuthButton />
		</header>
	);
};

export default Header;
