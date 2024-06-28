import { generateUUID } from '../../../../core/application/utils/generateUuid';
import { Summary } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { CreateSummaryPorts } from './create_summary.ports';

interface CreateSummaryUsecaseExecuteInput {
	userId: string;
	resumeId: string;
	data: Summary;
}

export interface CreateSummaryUsecase {
	execute(input: CreateSummaryUsecaseExecuteInput): Promise<void>;
}

export class DefaultCreateSummaryUsecase extends DefaultCommonResumeUsecase implements CreateSummaryUsecase {
	constructor(
		private readonly ports: CreateSummaryPorts,
		protected readonly commonPorts: CommonResumePorts
	) {
		super(commonPorts);
	}

	private async createNewSummary(summaryResumeId: string, resumeId: string, data: Summary) {
		await this.ports.createSummary({ summaryResumeId, data });
		await this.ports.insertSummaryIntoResume({ summaryResumeId, resumeId });
	}

	async execute({ userId, resumeId, data }: CreateSummaryUsecaseExecuteInput) {
		const currentUser = await this.validateUser({ userId });
		const currentResume = await this.validateResume({ resumeId, userId: currentUser.id });

		if (!currentResume) {
			await this.createResume({ resumeId, ownerId: currentUser.id });
			return await this.createNewSummary(generateUUID(), resumeId, data);
		}

		if (!currentResume.summary) {
			return await this.createNewSummary(generateUUID(), currentResume.id, data);
		}

		return await this.ports.updateSummary({ summaryResumeId: currentResume.summary, data });
	}
}
