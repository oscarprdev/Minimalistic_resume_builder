import { CommonResumeDatabase } from '../../infrastructure/common';
import { EducationResumeDatabase } from '../../infrastructure/education';
import { CommonResumeAdapter } from '../common/common.adapter';
import { CreateEducationAdapter } from './create/create_education.adapter';
import { CreateEducationHandler, DefaultCreateEducationHandler } from './create/create_education.handler';
import { DefaultCreateEducationUsecase } from './create/create_education.use_case';

import { DescribeEducationAdapter } from './describe/describe_education.adapter';
import { DefaultDescribeEducationHandler, DescribeEducationHandler } from './describe/describe_education.handler';
import { DefaultDescribeEducationUsecase } from './describe/describe_education.use_case';

export interface EducationUsecase {
	describeEducation(): DescribeEducationHandler;
	createEducation(): CreateEducationHandler;
}

export class DefaultEducationUsecase implements EducationUsecase {
	constructor(private readonly database: EducationResumeDatabase, private readonly commonDatabase: CommonResumeDatabase) {}

	describeEducation() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const describeEducationAdapter = new DescribeEducationAdapter(this.database);
		const describeEducationUsecase = new DefaultDescribeEducationUsecase(describeEducationAdapter, commonResumeAdapter);

		return new DefaultDescribeEducationHandler(describeEducationUsecase);
	}

	createEducation() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const createEducationAdapter = new CreateEducationAdapter(this.database);
		const createEducationUsecase = new DefaultCreateEducationUsecase(createEducationAdapter, commonResumeAdapter);

		return new DefaultCreateEducationHandler(createEducationUsecase);
	}
}
