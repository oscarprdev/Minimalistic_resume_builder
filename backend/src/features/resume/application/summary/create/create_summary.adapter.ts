import { SummaryResumeDatabase } from '../../../infrastructure/summary';
import {
	CreateSummaryPorts,
	CreateSummaryPortsInput,
	InsertSummaryIntoResumePortsInput,
	UpdateSummaryPortsInput,
} from './create_summary.ports';

export class CreateSummaryAdapter implements CreateSummaryPorts {
	constructor(private readonly database: SummaryResumeDatabase) {}

	async createSummary({ summaryResumeId, data }: CreateSummaryPortsInput): Promise<void> {
		await this.database.createSummary({ summaryResumeId, data });
	}

	async insertSummaryIntoResume({ summaryResumeId, resumeId }: InsertSummaryIntoResumePortsInput): Promise<void> {
		await this.database.insertSummaryIntoResume({ summaryResumeId, resumeId });
	}

	async updateSummary({ summaryResumeId, data }: UpdateSummaryPortsInput): Promise<void> {
		await this.database.updateSummary({ summaryResumeId, data });
	}
}
