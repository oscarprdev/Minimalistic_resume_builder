import { Database } from '../../core/infrastructure/database';
import { DefaultCommonResumeDatabase } from '../infrastructure/common';
import { DefaultEducationResumeDatabase } from '../infrastructure/education';
import { DefaultExperienceResumeDatabase } from '../infrastructure/experience';
import { DefaultGlobalResumeDatabase } from '../infrastructure/global';
import { DefaultHeaderResumeDatabase } from '../infrastructure/header';
import { DefaultLanguagesResumeDatabase } from '../infrastructure/languages';
import { DefaultSkillsResumeDatabase } from '../infrastructure/skills';
import { DefaultSummaryResumeDatabase } from '../infrastructure/summary';
import { DefaultEducationUsecase, EducationUsecase } from './education';
import { DefaultExperienceUsecase, ExperienceUsecase } from './experience';
import { DefaultGlobalUsecase, GlobalUsecase } from './global';
import { DefaultHeaderUsecase, HeaderUsecase } from './header';
import { DefaultLanguagesUsecase, LanguagesUsecase } from './languages';
import { DefaultSkillsUsecase, SkillsUsecase } from './skills';
import { DefaultSummaryUsecase, SummaryUsecase } from './summary';

export interface ResumeApplication {
	globalUsecase(): GlobalUsecase;

	headerUsecase(): HeaderUsecase;
	summaryUsecase(): SummaryUsecase;
	experienceUsecase(): ExperienceUsecase;
	educationUsecase(): EducationUsecase;
	languagesUsecase(): LanguagesUsecase;
	skillsUsecase(): SkillsUsecase;
}

export class DefaultResumeApplication {
	constructor(private readonly database: Database) {}

	globalUsecase() {
		const globalResumeDatabase = new DefaultGlobalResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		const headerResumeDatabase = new DefaultHeaderResumeDatabase(this.database);
		const summaryResumeDatabase = new DefaultSummaryResumeDatabase(this.database);
		const experienceResumeDatabase = new DefaultExperienceResumeDatabase(this.database);
		const educationResumeDatabase = new DefaultEducationResumeDatabase(this.database);
		const skillsResumeDatabase = new DefaultSkillsResumeDatabase(this.database);
		const languagesResumeDatabase = new DefaultLanguagesResumeDatabase(this.database);

		return new DefaultGlobalUsecase(
			globalResumeDatabase,
			commonResumeDatabase,
			headerResumeDatabase,
			summaryResumeDatabase,
			experienceResumeDatabase,
			educationResumeDatabase,
			skillsResumeDatabase,
			languagesResumeDatabase
		);
	}

	headerUsecase() {
		const headerResumeDatabase = new DefaultHeaderResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultHeaderUsecase(headerResumeDatabase, commonResumeDatabase);
	}

	summaryUsecase() {
		const summaryResumeDatabase = new DefaultSummaryResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultSummaryUsecase(summaryResumeDatabase, commonResumeDatabase);
	}

	experienceUsecase() {
		const experienceResumeDatabase = new DefaultExperienceResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultExperienceUsecase(experienceResumeDatabase, commonResumeDatabase);
	}

	educationUsecase() {
		const educationResumeDatabase = new DefaultEducationResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultEducationUsecase(educationResumeDatabase, commonResumeDatabase);
	}

	languagesUsecase() {
		const languagesResumeDatabase = new DefaultLanguagesResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultLanguagesUsecase(languagesResumeDatabase, commonResumeDatabase);
	}

	skillsUsecase() {
		const skillsResumeDatabase = new DefaultSkillsResumeDatabase(this.database);
		const commonResumeDatabase = new DefaultCommonResumeDatabase(this.database);

		return new DefaultSkillsUsecase(skillsResumeDatabase, commonResumeDatabase);
	}
}
