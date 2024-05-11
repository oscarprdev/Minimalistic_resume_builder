import { Database } from '../../core/infrastructure/database';
import { DefaultCommonUserDatabase } from '../infrastructure/common';
import { AuthUsecase, DefaultAuthUsecase } from './auth';

export interface UserApplication {
	authUsecase(): AuthUsecase;
}

export class DefaultUserApplication {
	constructor(private readonly database: Database) {}

	authUsecase() {
		const commonUserDatabase = new DefaultCommonUserDatabase(this.database);

		return new DefaultAuthUsecase(commonUserDatabase);
	}
}
