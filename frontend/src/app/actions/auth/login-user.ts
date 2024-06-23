'use server';

import { signIn } from '@/auth';
import { UserCredentials } from '@/types';

export const loginUser = async (input: UserCredentials) => {
	await signIn('credentials', input);
};
