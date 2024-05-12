import { CommonResumeDatabase } from '../../infrastructure/common';
import { ExperienceResumeDatabase } from '../../infrastructure/experience';
import { CommonResumeAdapter } from '../common/common.adapter';
import { CreateExperienceAdapter } from './create/create_experience.adapter';
import { CreateExperienceHandler, DefaultCreateExperienceHandler } from './create/create_experience.handler';
import { DefaultCreateExperienceUsecase } from './create/create_experience.use_case';
import { DeleteExperienceAdapter } from './delete/delete_experience.adapter';
import { DefaultDeleteExperienceHandler, DeleteExperienceHandler } from './delete/delete_experience.handler';
import { DefaultDeleteExperienceUsecase } from './delete/delete_experience.use_case';
import { DescribeExperienceAdapter } from './describe/describe_experience.adapter';
import { DefaultDescribeExperienceHandler, DescribeExperienceHandler } from './describe/describe_experience.handler';
import { DefaultDescribeExperienceUsecase } from './describe/describe_experience.use_case';

export interface ExperienceUsecase {
	describeExperience(): DescribeExperienceHandler;
	createExperience(): CreateExperienceHandler;
	deleteExperience(): DeleteExperienceHandler;
}

export class DefaultExperienceUsecase implements ExperienceUsecase {
	constructor(private readonly database: ExperienceResumeDatabase, private readonly commonDatabase: CommonResumeDatabase) {}

	describeExperience() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const describeExperienceAdapter = new DescribeExperienceAdapter(this.database);
		const describeExperienceUsecase = new DefaultDescribeExperienceUsecase(describeExperienceAdapter, commonResumeAdapter);

		return new DefaultDescribeExperienceHandler(describeExperienceUsecase);
	}

	createExperience() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const createExperienceAdapter = new CreateExperienceAdapter(this.database);
		const createExperienceUsecase = new DefaultCreateExperienceUsecase(createExperienceAdapter, commonResumeAdapter);

		return new DefaultCreateExperienceHandler(createExperienceUsecase);
	}

	deleteExperience() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const deleteExperienceAdapter = new DeleteExperienceAdapter(this.database);
		const deleteExperienceUsecase = new DefaultDeleteExperienceUsecase(deleteExperienceAdapter, commonResumeAdapter);

		return new DefaultDeleteExperienceHandler(deleteExperienceUsecase);
	}
}
