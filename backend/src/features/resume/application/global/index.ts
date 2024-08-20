import { CommonResumeDatabase } from '../../infrastructure/common';
import { EducationResumeDatabase } from '../../infrastructure/education';
import { ExperienceResumeDatabase } from '../../infrastructure/experience';
import { GlobalResumeDatabase } from '../../infrastructure/global';
import { HeaderResumeDatabase } from '../../infrastructure/header';
import { LanguagesResumeDatabase } from '../../infrastructure/languages';
import { SkillsResumeDatabase } from '../../infrastructure/skills';
import { SummaryResumeDatabase } from '../../infrastructure/summary';
import { CommonResumeAdapter } from '../common/common.adapter';
import { DeleteResumeAdapter } from './delete/delete_resume.adapter';
import { DefaultDeleteResumeHandler, DeleteResumeHandler } from './delete/delete_resume.handler';
import { DefaultDeleteResumeUsecase } from './delete/delete_resume.use-case';
import { DescribeResumeAdapter } from './describe/describe_resume.adapter';
import { DefaultDescribeResumeHandler, DescribeResumeHandler } from './describe/describe_resume.handler';
import { DefaultDescribeResumeUsecase } from './describe/describe_resume.use-case';
import { ListResumeAdapter } from './list/list_resume.adapter';
import { DefaultListResumeHandler, ListResumeHandler } from './list/list_resume.handler';
import { DefaultListResumeUsecase } from './list/list_resume.use-case';
import { UpdateResumeAdapter } from './update/update_resume.adapter';
import { DefaultUpdateResumeHandler, UpdateResumeHandler } from './update/update_resume.handler';
import { DefaultUpdateResumeUsecase } from './update/update_resume.use-case';

export interface GlobalUsecase {
	describeResume(): DescribeResumeHandler;
	listResume(): ListResumeHandler;
	updateResume(): UpdateResumeHandler;
	deleteResume(): DeleteResumeHandler;
}

export class DefaultGlobalUsecase implements GlobalUsecase {
	constructor(
		private readonly database: GlobalResumeDatabase,
		private readonly commonDatabase: CommonResumeDatabase,
		private readonly headerDatabase: HeaderResumeDatabase,
		private readonly summaryDatabase: SummaryResumeDatabase,
		private readonly experienceDatabase: ExperienceResumeDatabase,
		private readonly educationDatabase: EducationResumeDatabase,
		private readonly skillsDatabase: SkillsResumeDatabase,
		private readonly languagesDatabase: LanguagesResumeDatabase
	) {}

	describeResume() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const describeResumeAdapter = new DescribeResumeAdapter(
			this.headerDatabase,
			this.summaryDatabase,
			this.experienceDatabase,
			this.educationDatabase,
			this.skillsDatabase,
			this.languagesDatabase
		);
		const describeResumeUsecase = new DefaultDescribeResumeUsecase(commonResumeAdapter, describeResumeAdapter);

		return new DefaultDescribeResumeHandler(describeResumeUsecase);
	}

	listResume() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const listResumeAdapter = new ListResumeAdapter(this.database);
		const listResumeUsecase = new DefaultListResumeUsecase(listResumeAdapter, commonResumeAdapter);

		return new DefaultListResumeHandler(listResumeUsecase);
	}

	updateResume() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const updateResumeAdapter = new UpdateResumeAdapter(this.database);
		const updateResumeUsecase = new DefaultUpdateResumeUsecase(updateResumeAdapter, commonResumeAdapter);

		return new DefaultUpdateResumeHandler(updateResumeUsecase);
	}

	deleteResume() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const deleteResumeAdapter = new DeleteResumeAdapter(this.database);
		const deleteResumeUsecase = new DefaultDeleteResumeUsecase(deleteResumeAdapter, commonResumeAdapter);

		return new DefaultDeleteResumeHandler(deleteResumeUsecase);
	}
}
