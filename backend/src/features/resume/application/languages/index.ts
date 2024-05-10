import { CommonResumeDatabase } from '../../infrastructure/common';
import { LanguagesResumeDatabase } from '../../infrastructure/languages';
import { CommonResumeAdapter } from '../common/common.adapter';
import { CreateLanguagesAdapter } from './create/create_languages.adapter';
import { CreateLanguagesHandler, DefaultCreateLanguagesHandler } from './create/create_languages.handler';
import { DefaultCreateLanguagesUsecase } from './create/create_languages.use-case';
import { DescribeLanguagesAdapter } from './describe/describe_languages.adapter';
import { DefaultDescribeLanguagesHandler, DescribeLanguagesHandler } from './describe/describe_languages.handler';
import { DefaultDescribeLanguagesUsecase } from './describe/describe_languages.use_case';
export interface LanguagesUsecase {
	describeLanguages(): DescribeLanguagesHandler;
	createLanguages(): CreateLanguagesHandler;
}

export class DefaultLanguagesUsecase implements LanguagesUsecase {
	constructor(private readonly database: LanguagesResumeDatabase, private readonly commonDatabase: CommonResumeDatabase) {}

	describeLanguages() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const describeLanguagesAdapter = new DescribeLanguagesAdapter(this.database);
		const describeLanguagesUsecase = new DefaultDescribeLanguagesUsecase(describeLanguagesAdapter, commonResumeAdapter);

		return new DefaultDescribeLanguagesHandler(describeLanguagesUsecase);
	}

	createLanguages() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const createLanguagesAdapter = new CreateLanguagesAdapter(this.database);
		const createLanguagesUsecase = new DefaultCreateLanguagesUsecase(createLanguagesAdapter, commonResumeAdapter);

		return new DefaultCreateLanguagesHandler(createLanguagesUsecase);
	}
}
