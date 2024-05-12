import { Summary } from '../../../core/domain/types';

export type ErrorActions = 'getSummary' | 'createSummary' | 'insertSummary' | 'updateSummary' | 'deleteSummary' | 'deleteSummaryFromResume';

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

export interface DeleteSummaryInfrastructureInput {
	summaryResumeId: string;
}

export interface DeleteSummaryFromResumeInfrastructureInput {
	resumeId: string;
}
