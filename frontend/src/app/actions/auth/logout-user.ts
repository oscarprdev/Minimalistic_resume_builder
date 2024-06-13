'use server';

import { signOut } from '@/auth';

export const logoutUserAction = async () => {
	await signOut({ redirectTo: '/' });
};
