'use server';

import { postCallback } from '@/services';
import { registerUserService } from '@/services/auth/register-user';
import { UserCredentials } from '@/types';

type RegisterUserInput = UserCredentials;

export const registerUser = async (values: RegisterUserInput) => {
	return await registerUserService({
		payload: values,
		postCallback,
	});
};
