import { CommonResumeDatabase } from '../../infrastructure/common';
import { GlobalResumeDatabase } from '../../infrastructure/global';
import { CommonResumeAdapter } from '../common/common.adapter';
import { ListResumeAdapter } from './list/list_resume.adapter';
import { DefaultListResumeHandler, ListResumeHandler } from './list/list_resume.handler';
import { DefaultListResumeUsecase } from './list/list_resume.use-case';
import { UpdateResumeAdapter } from './update/update_resume.adapter';
import { DefaultUpdateResumeHandler, UpdateResumeHandler } from './update/update_resume.handler';
import { DefaultUpdateResumeUsecase } from './update/update_resume.use-case';

export interface GlobalUsecase {
	listResume(): ListResumeHandler;
	updateResume(): UpdateResumeHandler;
}

export class DefaultGlobalUsecase implements GlobalUsecase {
	constructor(private readonly database: GlobalResumeDatabase, private readonly commonDatabase: CommonResumeDatabase) {}

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
}
