import { z } from 'zod';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { RequestParams } from '../../../../core/domain/interfaces';
import { CommonPostResponse, UserCredentials } from '../../../../core/domain/types';
import { RegisterUsecase } from './register.use-case';

export interface AuthInput {
	salt: string;
}

export interface RegisterHandler {
	handleRequest(request: RequestParams, authInput: AuthInput): Promise<Response>;
}

const RegisterSectionSchema = z.object({
	username: z.string(),
	password: z.string(),
});

type RegisterHandlerActions = 'extractPayload';

export class DefaultRegisterHandler implements RegisterHandler {
	constructor(private readonly usecase: RegisterUsecase) {}

	private async extractPayload(request: Request) {
		const body = await request.text();
		const bodyParsed = JSON.parse(body) as UserCredentials;

		const { error } = RegisterSectionSchema.safeParse(bodyParsed);

		if (error) {
			throw new DefaultErrorEntity().sendError<RegisterHandlerActions>('Request payload not correct', 400, 'extractPayload');
		}

		return { data: bodyParsed };
	}

	public async handleRequest(request: RequestParams, authInput: AuthInput) {
		try {
			const { data } = await this.extractPayload(request);

			const registerResponse = await this.usecase.execute({ username: data.username, password: data.password, authInput });

			return new Response(JSON.stringify(registerResponse), {
				status: 201,
			});
		} catch (error: unknown) {
			return new DefaultErrorEntity().handleError(error);
		}
	}
}
