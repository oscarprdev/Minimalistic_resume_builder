'use server';

import { signIn } from '@/auth';
import { UserCredentials } from '@/types';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

export const loginUser = async (input: UserCredentials) => {
	try {
		await signIn('credentials', input);
	} catch (error) {
		if (error instanceof AuthError) {
			return 'User is not registered';
		}

		revalidatePath('/');
	}
};
