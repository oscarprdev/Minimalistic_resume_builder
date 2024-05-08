import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Summary } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DescribeSummaryPorts } from './describe_summary.ports';

interface DescribeSummaryUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DescribeSummaryUsecaseAction = 'provideSummaryId' | 'provideSummaryData';

export interface DescribeSummaryUsecase {
	execute(input: DescribeSummaryUsecaseExecuteInput): Promise<Summary>;
}

export class DefaultDescribeSummaryUsecase extends DefaultCommonResumeUsecase implements DescribeSummaryUsecase {
	constructor(private readonly ports: DescribeSummaryPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideSummaryId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.summary) {
			return new DefaultErrorEntity().sendError<DescribeSummaryUsecaseAction>('Summary not stored on a resume', 404, 'provideSummaryId');
		}

		return currentResume.summary;
	}

	private async provideSummaryData(summaryResumeId: string): Promise<Summary> {
		const summary = await this.ports.getSummary({ summaryResumeId });

		if (!summary) {
			return new DefaultErrorEntity().sendError<DescribeSummaryUsecaseAction>('Summary not found', 404, 'provideSummaryData');
		}

		return summary;
	}

	async execute({ userId, resumeId }: DescribeSummaryUsecaseExecuteInput): Promise<Summary> {
		const currentUser = await this.validateUser({ userId });
		const summaryResumeId = await this.provideSummaryId(resumeId, currentUser);

		return await this.provideSummaryData(summaryResumeId);
	}
}
