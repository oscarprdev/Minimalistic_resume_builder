'use server';

import { loginUser } from '@/app/actions/auth/login-user';
import { logoutUser } from '@/app/actions/auth/logout-user';
import { Button } from '@/components/ui/button';
import { User } from 'next-auth';

interface AuthButtonProps {
	user?: User;
}

const AuthButton = async ({ user }: AuthButtonProps) => {
	const onAuthClick = async () => {
		'use server';
		user ? await logoutUser() : await loginUser({ username: 'oscarpr', password: '1234' });
	};

	return (
		<form action={onAuthClick}>
			<Button
				type='submit'
				variant={user ? 'darkOutline' : 'dark'}>
				{user ? 'Logout' : 'Login'}
			</Button>
		</form>
	);
};

export default AuthButton;
