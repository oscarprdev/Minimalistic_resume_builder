import { CommonUserDatabase } from '../../infrastructure/common';
import { LoginAdapter } from './login/login.adapter';
import { DefaultLoginHandler, LoginHandler } from './login/login.handler';
import { DefaultLoginUsecase } from './login/login.use-case';
import { RegisterAdapter } from './register/register.adapter';
import { DefaultRegisterHandler, RegisterHandler } from './register/register.handler';
import { DefaultRegisterUsecase } from './register/register.use-case';

export interface AuthUsecase {
	login(): LoginHandler;
	register(): RegisterHandler;
}

export class DefaultAuthUsecase implements AuthUsecase {
	constructor(private readonly commonDatabase: CommonUserDatabase) {}

	login() {
		const loginAdapter = new LoginAdapter(this.commonDatabase);
		const loginUsecase = new DefaultLoginUsecase(loginAdapter);

		return new DefaultLoginHandler(loginUsecase);
	}

	register() {
		const registerAdapter = new RegisterAdapter(this.commonDatabase);
		const registerUsecase = new DefaultRegisterUsecase(registerAdapter);

		return new DefaultRegisterHandler(registerUsecase);
	}
}
