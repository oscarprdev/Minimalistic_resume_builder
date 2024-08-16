'use client';

import { Button } from '../ui/button';
import { logoutUser } from '@/app/actions/auth/logout';

const LogoutButton = () => {
	const handleLogout = async () => logoutUser();
	return (
		<Button size={'sm'} onClick={handleLogout}>
			Logout
		</Button>
	);
};

export default LogoutButton;
