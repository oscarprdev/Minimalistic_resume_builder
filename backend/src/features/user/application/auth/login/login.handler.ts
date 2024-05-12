import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonPostResponse, UserAuthResponse, UserCredentials } from '../../../../core/domain/types';
import { LoginUsecase } from './login.use-case';

export interface AuthInput {
	salt: string;
	secret: string;
}

export interface LoginHandler {
	handleRequest(request: RequestParams, authInput: AuthInput): Promise<Response>;
}

const LoginSectionSchema = z.object({
	username: z.string(),
	password: z.string(),
});

type LoginHandlerActions = 'extractPayload';

export class DefaultLoginHandler implements LoginHandler {
	constructor(private readonly usecase: LoginUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as UserCredentials;

		const { error } = LoginSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<LoginHandlerActions>('Request payload not correct', 400, 'extractPayload');
		}

		return { data: bodyParsed };
	}

	public async handleRequest(request: RequestParams, authInput: AuthInput) {
		try {
			const { data } = await this.extractPayload(request);

			const loginResponse = await this.usecase.execute({ username: data.username, password: data.password, authInput });

			return new Response(JSON.stringify(loginResponse), {
				status: 201,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
