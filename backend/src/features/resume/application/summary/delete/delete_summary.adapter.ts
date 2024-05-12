import { Summary } from '../../../../core/domain/types';
import { SummaryResumeDatabase } from '../../../infrastructure/summary';
import {
	DeleteSummaryFromResumePortsInput,
	DeleteSummaryPorts,
	DeleteSummaryPortsInput,
	GetSummaryPortsInput,
} from './delete_summary.ports';

export class DeleteSummaryAdapter implements DeleteSummaryPorts {
	constructor(private readonly database: SummaryResumeDatabase) {}

	async deleteSummary({ summaryResumeId }: DeleteSummaryPortsInput): Promise<void> {
		await this.database.deleteSummary({ summaryResumeId });
	}

	async deleteSummaryFromResume({ resumeId }: DeleteSummaryFromResumePortsInput): Promise<void> {
		await this.database.deleteSummaryFromResume({ resumeId });
	}

	async getSummary({ summaryResumeId }: GetSummaryPortsInput): Promise<Summary | null> {
		const summaryDb = await this.database.getSummary({ summaryResumeId });

		if (!summaryDb) return null;

		return {
			id: summaryDb.id,
			title: summaryDb.title,
			summary: summaryDb.summary,
		};
	}
}
