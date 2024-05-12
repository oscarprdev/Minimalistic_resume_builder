import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Summary } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DeleteSummaryPorts } from './delete_summary.ports';

interface DeleteSummaryUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DeleteSummaryUsecaseAction = 'provideSummaryId' | 'provideSummaryData';

export interface DeleteSummaryUsecase {
	execute(input: DeleteSummaryUsecaseExecuteInput): Promise<void>;
}

export class DefaultDeleteSummaryUsecase extends DefaultCommonResumeUsecase implements DeleteSummaryUsecase {
	constructor(private readonly ports: DeleteSummaryPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideSummaryId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.summary) {
			return new DefaultErrorEntity().sendError<DeleteSummaryUsecaseAction>('Summary not stored on a resume', 404, 'provideSummaryId');
		}

		return currentResume.summary;
	}

	private async provideSummaryData(summaryResumeId: string): Promise<Summary> {
		const Summary = await this.ports.getSummary({ summaryResumeId });

		if (!Summary) {
			return new DefaultErrorEntity().sendError<DeleteSummaryUsecaseAction>('Summary not found', 404, 'provideSummaryData');
		}

		return Summary;
	}

	async execute({ userId, resumeId }: DeleteSummaryUsecaseExecuteInput): Promise<void> {
		const currentUser = await this.validateUser({ userId });
		const summaryResumeId = await this.provideSummaryId(resumeId, currentUser);
		const { id } = await this.provideSummaryData(summaryResumeId);

		await this.ports.deleteSummary({ summaryResumeId: id });
		await this.ports.deleteSummaryFromResume({ resumeId });
	}
}
