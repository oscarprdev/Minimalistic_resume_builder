import { CommonResumeDatabase } from '../../infrastructure/common';
import { GlobalResumeDatabase } from '../../infrastructure/global';
import { CommonResumeAdapter } from '../common/common.adapter';
import { DeleteResumeAdapter } from './delete/delete_resume.adapter';
import { DefaultDeleteResumeHandler, DeleteResumeHandler } from './delete/delete_resume.handler';
import { DefaultDeleteResumeUsecase } from './delete/delete_resume.use-case';
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
		private readonly commonDatabase: CommonResumeDatabase
	) {}

	describeResume() {
		const commonResumeAdapter = new CommonResumeAdapter(this.commonDatabase);
		const describeResumeUsecase = new DefaultDescribeResumeUsecase(commonResumeAdapter);

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
