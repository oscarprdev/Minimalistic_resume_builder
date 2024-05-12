import { Summary } from '../../../../core/domain/types';

export interface DeleteSummaryPorts {
	deleteSummary(input: DeleteSummaryPortsInput): Promise<void>;
	deleteSummaryFromResume(input: DeleteSummaryFromResumePortsInput): Promise<void>;
	getSummary(input: GetSummaryPortsInput): Promise<Summary | null>;
}

export interface GetSummaryPortsInput {
	summaryResumeId: string;
}

export interface DeleteSummaryPortsInput {
	summaryResumeId: string;
}

export interface DeleteSummaryFromResumePortsInput {
	resumeId: string;
}
