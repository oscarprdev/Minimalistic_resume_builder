import { Summary } from '../../../core/domain/types';

export type ErrorActions = 'getSummary' | 'createSummary' | 'insertSummary' | 'updateSummary';

export interface CreateSummaryInfrastructureInput {
	summaryResumeId: string;
	data: Summary;
}

export interface InsertSummaryInfrastructureInput {
	summaryResumeId: string;
	resumeId: string;
}

export interface GetSummaryInfrastructureInput {
	summaryResumeId: string;
}

export interface UpdateSummaryInfrastructureInput {
	summaryResumeId: string;
	data: Summary;
}
