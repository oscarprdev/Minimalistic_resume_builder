import { Database } from '../../core/infrastructure/database';
import { DefaultCommonResumeDatabase } from '../infrastructure/common';
import { DefaultExperienceResumeDatabase } from '../infrastructure/experience';
import { DefaultHeaderResumeDatabase } from '../infrastructure/header';
import { DefaultSummaryResumeDatabase } from '../infrastructure/summary';
import { DefaultExperienceUsecase, ExperienceUsecase } from './experience';
import { DefaultHeaderUsecase, HeaderUsecase } from './header';
import { DefaultSumaryUsecase, SumaryUsecase } from './summary';

export interface ResumeApplication {
	headerUsecase(): HeaderUsecase;
	summaryUsecase(): SumaryUsecase;
	experienceUsecase(): ExperienceUsecase;
}

export class DefaultResumeApplication {
	constructor(private readonly database: Database) {}

	headerUsecase() {
		const headerResumeDatabase = new DefaultHeaderResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultHeaderUsecase(headerResumeDatabase, commonResumeDatabase);
	}

	summaryUsecase() {
		const summaryResumeDatabase = new DefaultSummaryResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultSumaryUsecase(summaryResumeDatabase, commonResumeDatabase);
	}

	experienceUsecase() {
		const experienceResumeDatabase = new DefaultExperienceResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultExperienceUsecase(experienceResumeDatabase, commonResumeDatabase);
	}
}
