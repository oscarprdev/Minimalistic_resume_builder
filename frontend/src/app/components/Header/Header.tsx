'use server';

import AuthModal from '../Modals/AuthModal';
import LogoutButton from './LogoutButton';
import { auth } from '@/auth';

const Header = async () => {
	const session = await auth();

	return (
		<header className="w-screen flex justify-between py-2 px-5">
			<h1 className="text-sm">Resume builder</h1>
			{session?.user?.name ? <LogoutButton /> : <AuthModal />}
		</header>
	);
};

export default Header;
