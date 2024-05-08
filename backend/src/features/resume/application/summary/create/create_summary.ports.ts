import { Summary } from '../../../../core/domain/types';

export interface CreateSummaryPorts {
	createSummary(input: CreateSummaryPortsInput): Promise<void>;
	insertSummaryIntoResume(input: InsertSummaryIntoResumePortsInput): Promise<void>;
	updateSummary(input: UpdateSummaryPortsInput): Promise<void>;
}

export interface CreateSummaryPortsInput {
	summaryResumeId: string;
	data: Summary;
}

export interface InsertSummaryIntoResumePortsInput {
	summaryResumeId: string;
	resumeId: string;
}

export interface UpdateSummaryPortsInput {
	summaryResumeId: string;
	data: Summary;
}
