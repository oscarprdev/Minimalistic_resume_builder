import { Database } from '../../core/infrastructure/database';
import { DefaultResumeDatabase } from '../infrastructure';
import { DefaultHeaderUsecase, HeaderUsecase } from './header';

export interface ResumeApplication {
	headerUsecase(): HeaderUsecase;
}

export class DefaultResumeApplication {
	constructor(private readonly database: Database) {}

	headerUsecase() {
		const resumeDatabase = new DefaultResumeDatabase(this.database);

		return new DefaultHeaderUsecase(resumeDatabase);
	}
}
