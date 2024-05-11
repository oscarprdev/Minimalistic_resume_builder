import { LoginPorts } from './login.ports';

interface LoginUsecaseExecuteInput {
	username: string;
	password: string;
}

export interface LoginUsecase {
	execute(input: LoginUsecaseExecuteInput): Promise<void>;
}

export class DefaultLoginUsecase implements LoginUsecase {
	constructor(private readonly ports: LoginPorts) {}

	execute(input: LoginUsecaseExecuteInput): Promise<void> {
		console.log(input);
		throw new Error('Method not implemented.');
	}
}
