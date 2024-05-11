import { CommonUserDatabase } from '../../infrastructure/common';
import { LoginAdapter } from './login/login.adapter';
import { DefaultLoginHandler, LoginHandler } from './login/login.handler';
import { DefaultLoginUsecase } from './login/login.use-case';

export interface AuthUsecase {
	login(): LoginHandler;
}

export class DefaultAuthUsecase implements AuthUsecase {
	constructor(private readonly commonDatabase: CommonUserDatabase) {}

	login() {
		const loginAdapter = new LoginAdapter(this.commonDatabase);
		const loginUsecase = new DefaultLoginUsecase(loginAdapter);

		return new DefaultLoginHandler(loginUsecase);
	}
}
