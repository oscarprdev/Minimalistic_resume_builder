'use client';

import { logoutUser } from '@/app/actions/auth/logout-user';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const LogOutButton = () => {
	const pathname = usePathname();
	const isHome = !pathname.includes('builder');

	return (
		<Button
			onClick={async () => await logoutUser()}
			variant={!isHome ? 'outline' : 'default'}>
			Logout
		</Button>
	);
};

export default LogOutButton;
