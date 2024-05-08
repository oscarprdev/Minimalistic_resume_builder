import { Summary } from '../../../../core/domain/types';

export interface DescribeSummaryPorts {
	getSummary(input: GetSummaryPortsInput): Promise<Summary | null>;
}

export interface GetSummaryPortsInput {
	summaryResumeId: string;
}
