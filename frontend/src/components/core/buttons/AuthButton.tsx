'use client';

import { authAction } from '@/app/actions/auth/auth';
import { Button } from '@/components/ui/button';
import { User } from 'next-auth';
import { usePathname } from 'next/navigation';

interface AuthButtonProps {
	user?: User;
}

const AuthButton = ({ user }: AuthButtonProps) => {
	const pathname = usePathname();
	const isHome = !pathname.includes('builder');

	return (
		<Button
			onClick={() => authAction(user)}
			variant={(user && isHome) || !isHome ? 'outline' : 'default'}>
			{user ? 'Logout' : 'Login'}
		</Button>
	);
};

export default AuthButton;
