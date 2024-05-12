import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { UserAuthResponse } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { DefaultAuthUsecases } from '../common/auth_common.use-case';
import { AuthInput } from './login.handler';
import { LoginPorts } from './login.ports';
import jwt from '@tsndr/cloudflare-worker-jwt';

interface LoginUsecaseExecuteInput {
	username: string;
	password: string;
	authInput: AuthInput;
}

export interface LoginUsecase {
	execute(input: LoginUsecaseExecuteInput): Promise<UserAuthResponse>;
}

export class DefaultLoginUsecase extends DefaultAuthUsecases implements LoginUsecase {
	constructor(private readonly ports: LoginPorts) {
		super();
	}

	private async validateUserAuthCredentials(username: string, password: string, salt: string): Promise<UserDb> {
		const userDb = await this.ports.describeUserByUsername({ username });

		if (!userDb) {
			new DefaultErrorEntity().sendError('Bad request: user does not exist', 400, 'validateUserAuthCredentials');
		}

		const isPasswordValid = await this.verifyPassword({ password, hashedPassword: userDb.password, hexSalt: salt });

		if (!isPasswordValid) {
			new DefaultErrorEntity().sendError('Bad request: credentials not valid', 400, 'validateUserAuthCredentials');
		}

		return userDb;
	}

	private async verifyToken(username: string, password: string, secret: string): Promise<string> {
		const token = await jwt.sign({ username, password }, secret);
		const isValid = await jwt.verify(token, secret);

		if (!isValid) {
			new DefaultErrorEntity().sendError('Bad request: JWT not valid', 400, 'verifyToken');
		}

		return token;
	}

	async execute({ username, password, authInput }: LoginUsecaseExecuteInput): Promise<UserAuthResponse> {
		const userDb = await this.validateUserAuthCredentials(username, password, authInput.salt);
		const token = await this.verifyToken(userDb.username, userDb.password, authInput.secret);

		return {
			id: userDb.id,
			username: userDb.username,
			token,
		} satisfies UserAuthResponse;
	}
}
