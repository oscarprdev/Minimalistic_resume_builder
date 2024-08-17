'use server';

import { signIn } from '@/auth';
import { errorResponse, successResponse } from '@/lib/types';
import { UserCredentials } from '@/types';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';

const DEFAULT_LOGGING_ERROR = 'Error logging user';

export const logInUser = async (values: UserCredentials) => {
	try {
		await signIn('credentials', values);

		revalidatePath('/');
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return errorResponse('User credentials not valid');
				case 'CallbackRouteError':
					return errorResponse('User not found');
				default:
					return errorResponse(error instanceof Error ? error.message : DEFAULT_LOGGING_ERROR);
			}
		}

		if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
			return successResponse('User logged successfully');
		}

		return errorResponse(error instanceof Error ? error.message : DEFAULT_LOGGING_ERROR);
	}
};
