'use server';

import LoginButton from '../buttons/LoginButton';

const Header = () => {
	return (
		<header className='bg-white py-5 px-10 border-b border-b-gray-300 shadow-b-lg flex items-center justify-between'>
			<h1>Resume builder</h1>
			<LoginButton />
		</header>
	);
};

export default Header;
