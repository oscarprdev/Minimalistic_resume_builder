import { API_URL } from '@/constants';
import { errorResponse, successResponse } from '@/lib/types';
import { UserCredentials } from '@/types';
import { z } from 'zod';

const userCredentialsSchema = z.object({
	username: z.string().min(4),
	password: z.string().min(4),
});

class AuthService {
	constructor() {}

	private validateUserCredentials(input: UserCredentials) {
		return userCredentialsSchema.safeParse(input).success;
	}

	async login(input: UserCredentials) {
		try {
			const isInputValid = this.validateUserCredentials(input);
			if (!isInputValid) return errorResponse('User credentials pattern is not valid');

			const response = await fetch(`${API_URL}/user/login`, {
				method: 'POST',
				body: JSON.stringify(input),
			});

			const jsonResponse = await response.json();

			return successResponse({ username: jsonResponse.username, id: jsonResponse.id });
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : 'Error loggin user');
		}
	}

	async register(input: UserCredentials) {
		try {
			const isInputValid = this.validateUserCredentials(input);
			if (!isInputValid) return errorResponse('User credentials pattern is not valid');

			const response = await fetch(`${API_URL}/user/register`, {
				method: 'POST',
				body: JSON.stringify(input),
			});

			const jsonResponse = await response.json();

			console.log(jsonResponse);

			return successResponse('User registered successfully');
		} catch (error) {
			return errorResponse(error instanceof Error ? error.message : 'Error registering user');
		}
	}
}

export const authService = new AuthService();
