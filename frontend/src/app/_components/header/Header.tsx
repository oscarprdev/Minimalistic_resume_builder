'use server';

import AuthButton from '../buttons/AuthButton';

const Header = () => {
	return (
		<header className='bg-white py-5 px-10 border-b border-b-gray-300 shadow-b-lg flex items-center justify-between'>
			<h1>Resume builder</h1>
			<AuthButton />
		</header>
	);
};

export default Header;
