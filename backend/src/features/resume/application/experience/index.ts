import { CommonResumeDatabase } from '../../infrastructure/common';
import { ExperienceResumeDatabase } from '../../infrastructure/experience';
import { CommonResumeAdapter } from '../common/common.adapter';
import { CreateExperienceAdapter } from './create/create_experience.adapter';
import { CreateExperienceHandler, DefaultCreateExperienceHandler } from './create/create_experience.handler';
import { DefaultCreateExperienceUsecase } from './create/create_experience.use_case';

export interface ExperienceUsecase {
	// describeExperience(): DescribeExperienceHandler;
	createExperience(): CreateExperienceHandler;
}

export class DefaultExperienceUsecase implements ExperienceUsecase {
	constructor(private readonly database: ExperienceResumeDatabase, private readonly commonDatabase: CommonResumeDatabase) {}

	// describeExperience() {
	// 	const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
	// 	const describeExperienceAdapter = new DescribeExperienceAdapter(this.database);
	// 	const describeExperienceUsecase = new DefaultDescribeExperienceUsecase(describeExperienceAdapter, commonResumeAdapter);

	// 	return new DefaultDescribeExperienceHandler(describeExperienceUsecase);
	// }

	createExperience() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const createExperienceAdapter = new CreateExperienceAdapter(this.database);
		const createExperienceUsecase = new DefaultCreateExperienceUsecase(createExperienceAdapter, commonResumeAdapter);

		return new DefaultCreateExperienceHandler(createExperienceUsecase);
	}
}
