import { Summary } from '../../../../core/domain/types';
import { SummaryResumeDatabase } from '../../../infrastructure/summary';
import { DescribeSummaryPorts, GetSummaryPortsInput } from './describe_summary.ports';

export class DescribeSummaryAdapter implements DescribeSummaryPorts {
	constructor(private readonly database: SummaryResumeDatabase) {}

	async getSummary({ summaryResumeId }: GetSummaryPortsInput): Promise<Summary | null> {
		const summaryDb = await this.database.getSummary({ summaryResumeId });

		if (!summaryDb) return null;

		return {
			id: summaryDb.id,
			title: summaryDb.title,
			isHidden: summaryDb.isHidden,
			summary: summaryDb.summary,
		};
	}
}
