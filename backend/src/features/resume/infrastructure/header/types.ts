import { Header } from '../../../core/domain/types';

export type ErrorActions = 'getHeader' | 'createHeader' | 'insertHeader' | 'updateHeader' | 'deleteHeader' | 'deleteHeaderFromResume';

export interface CreateHeaderInfrastructureInput {
	headerResumeId: string;
	data: HeaderPayload;
}

export interface HeaderPayload extends Omit<Header, 'links'> {
	links: string;
}

export interface InsertHeaderInfrastructureInput {
	headerResumeId: string;
	resumeId: string;
}

export interface GetHeaderInfrastructureInput {
	headerResumeId: string;
}

export interface UpdateHeaderInfrastructureInput {
	headerResumeId: string;
	data: HeaderPayload;
}

export interface DeleteHeaderInfrastructureInput {
	headerResumeId: string;
}

export interface DeleteHeaderFromResumeInfrastructureInput {
	resumeId: string;
}
