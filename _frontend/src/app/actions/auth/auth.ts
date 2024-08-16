'use server';

import { User } from 'next-auth';
import { loginUser } from './login-user';
import { logoutUser } from './logout-user';

export const authAction = async (user?: User) => {
	user ? await logoutUser() : await loginUser({ username: 'oscarpr', password: '1234' });
};
