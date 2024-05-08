import { CommonResumeDatabase } from '../../infrastructure/common';
import { HeaderResumeDatabase } from '../../infrastructure/header';
import { CommonResumeAdapter } from '../common/common.adapter';
import { CreateHeaderAdapter } from './create/create_header.adapter';
import { CreateHeaderHandler, DefaultCreateHeaderHandler } from './create/create_header.handler';
import { DefaultCreateHeaderUsecase } from './create/create_header.use_case';

import { DescribeHeaderAdapter } from './describe/describe_header.adapter';
import { DefaultDescribeHeaderHandler, DescribeHeaderHandler } from './describe/describe_header.handler';
import { DefaultDescribeHeaderUsecase } from './describe/describe_header.use_case';

export interface HeaderUsecase {
	describeHeader(): DescribeHeaderHandler;
	createHeader(): CreateHeaderHandler;
}

export class DefaultHeaderUsecase implements HeaderUsecase {
	constructor(private readonly database: HeaderResumeDatabase, private readonly commonDatabase: CommonResumeDatabase) {}

	describeHeader() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const describeHeaderAdapter = new DescribeHeaderAdapter(this.database);
		const describeHeaderUsecase = new DefaultDescribeHeaderUsecase(describeHeaderAdapter, commonResumeAdapter);

		return new DefaultDescribeHeaderHandler(describeHeaderUsecase);
	}

	createHeader() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const createHeaderAdapter = new CreateHeaderAdapter(this.database);
		const createHeaderUsecase = new DefaultCreateHeaderUsecase(createHeaderAdapter, commonResumeAdapter);

		return new DefaultCreateHeaderHandler(createHeaderUsecase);
	}
}
