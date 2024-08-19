import { isError } from './lib/types';
import { authService } from './services/auth-service';
import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const response = await authService.login({
					username: credentials.username as string,
					password: credentials.password as string,
				});

				if (isError(response)) {
					throw new Error(response.error);
				}

				return {
					name: response.success.username,
					id: response.success.id,
				};
			},
		}),
	],
} satisfies NextAuthConfig;
