import { CommonResumeDatabase } from '../../infrastructure/common';
import { SkillsResumeDatabase } from '../../infrastructure/skills';
import { CommonResumeAdapter } from '../common/common.adapter';
import { CreateSkillsAdapter } from './create/create_skills.adapter';
import { CreateSkillsHandler, DefaultCreateSkillsHandler } from './create/create_skills.handler';
import { DefaultCreateSkillsUsecase } from './create/create_skills.use-case';
import { DescribeSkillsAdapter } from './describe/describe_skills.adapter';
import { DefaultDescribeSkillsHandler, DescribeSkillsHandler } from './describe/describe_skills.handler';
import { DefaultDescribeSkillsUsecase } from './describe/describe_skills.use_case';

export interface SkillsUsecase {
	describeSkills(): DescribeSkillsHandler;
	createSkills(): CreateSkillsHandler;
}

export class DefaultSkillsUsecase implements SkillsUsecase {
	constructor(private readonly database: SkillsResumeDatabase, private readonly commonDatabase: CommonResumeDatabase) {}

	describeSkills() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const describeSkillsAdapter = new DescribeSkillsAdapter(this.database);
		const describeSkillsUsecase = new DefaultDescribeSkillsUsecase(describeSkillsAdapter, commonResumeAdapter);

		return new DefaultDescribeSkillsHandler(describeSkillsUsecase);
	}

	createSkills() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const createSkillsAdapter = new CreateSkillsAdapter(this.database);
		const createSkillsUsecase = new DefaultCreateSkillsUsecase(createSkillsAdapter, commonResumeAdapter);

		return new DefaultCreateSkillsHandler(createSkillsUsecase);
	}
}
