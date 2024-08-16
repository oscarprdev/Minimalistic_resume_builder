import Credentials from 'next-auth/providers/credentials';
import zod from 'zod';
import { NextAuthConfig } from 'next-auth';
import { loginUserService } from './services/auth/login-user';
import { postCallback } from './services';

export const loginSchema = zod.object({
	username: zod.string(),
	password: zod.string(),
});

export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				const validateFields = loginSchema.safeParse(credentials);
				if (validateFields.success) {
					const response = await loginUserService({ payload: validateFields.data, postCallback });
					if (response._tag === 'Left') {
						return null;
					}

					return response.right;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
