import { generateUUID } from '../../../../core/application/utils/generateUuid';
import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { UserAuthResponse } from '../../../../core/domain/types';
import { DefaultAuthUsecases } from '../common/auth_common.use-case';
import { AuthInput } from './register.handler';
import { RegisterPorts } from './register.ports';

export interface RegisterUsecaseExecuteInput {
	username: string;
	password: string;
	authInput: AuthInput;
}

export interface RegisterUsecase {
	execute(input: RegisterUsecaseExecuteInput): Promise<UserAuthResponse>;
}

export class DefaultRegisterUsecase extends DefaultAuthUsecases implements RegisterUsecase {
	constructor(private readonly ports: RegisterPorts) {
		super();
	}

	private async verifyUniqueUser(username: string) {
		const userDb = await this.ports.describeUserByUsername({ username });

		if (userDb && userDb.id) {
			new DefaultErrorEntity().sendError('Bad request: user already exist', 400, 'validateUserAuthCredentials');
		}
	}

	async execute({ username, password, authInput }: RegisterUsecaseExecuteInput): Promise<UserAuthResponse> {
		await this.verifyUniqueUser(username);
		const hashedPassword = await this.hashPassword({ password, hexSalt: authInput.salt });

		const userId = generateUUID();
		await this.ports.insertUser({ id: userId, username, password: hashedPassword });

		return {
			id: userId,
			username,
		} satisfies UserAuthResponse;
	}
}
