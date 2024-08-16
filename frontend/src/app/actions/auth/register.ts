'use server';

import { authService } from '@/services/auth-service';
import { UserCredentials } from '@/types';

export const registerUser = async (values: UserCredentials) => {
	return await authService.register(values);
};
