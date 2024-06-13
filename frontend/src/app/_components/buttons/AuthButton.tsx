'use server';

import { loginUserAction } from '@/app/actions/auth/login-user';
import { logoutUserAction } from '@/app/actions/auth/logout-user';
import { useUserLogged } from '@/hooks/use-user-logged';
import { Button } from '@/components/ui/button';

const AuthButton = async () => {
	const user = await useUserLogged();

	const onAuthClick = async () => {
		'use server';
		user ? await logoutUserAction() : await loginUserAction({ username: 'oscarpr', password: '1234' });
	};

	return (
		<form action={onAuthClick}>
			<Button
				type='submit'
				variant={user ? 'outline' : 'default'}>
				{user ? 'Logout' : 'Login'}
			</Button>
		</form>
	);
};

export default AuthButton;
