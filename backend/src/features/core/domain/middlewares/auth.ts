import { Env } from '../../../..';
import jwt from '@tsndr/cloudflare-worker-jwt';
import { DefaultErrorEntity } from '../entities/Error';

export type ValidateAuthInput = {
	token: string;
	env: Env;
};

export type ValidateAuthOutput = {
	token: string;
};

export class AuthMiddleware {
	constructor() {}

	async validateAuth(input: ValidateAuthInput) {
		const isValid = await jwt.verify(input.token, input.env.SECRET);

		if (!isValid) {
			new DefaultErrorEntity().sendError('Token outdated', 500, 'validateAuth');
		}

		return {
			token: input.token,
		};
	}
}
