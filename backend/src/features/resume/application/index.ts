import { Database } from '../../core/infrastructure/database';
import { DefaultCommonResumeDatabase } from '../infrastructure/common';
import { DefaultHeaderResumeDatabase } from '../infrastructure/header';
import { DefaultHeaderUsecase, HeaderUsecase } from './header';

export interface ResumeApplication {
	headerUsecase(): HeaderUsecase;
}

export class DefaultResumeApplication {
	constructor(private readonly database: Database) {}

	headerUsecase() {
		const headerResumeDatabase = new DefaultHeaderResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultHeaderUsecase(headerResumeDatabase, commonResumeDatabase);
	}
}
