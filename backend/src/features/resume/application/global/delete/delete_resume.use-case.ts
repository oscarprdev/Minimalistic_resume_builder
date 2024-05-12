import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DeleteResumePorts } from './delete_resume.ports';

interface DeleteResumeUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

export interface DeleteResumeUsecase {
	execute(input: DeleteResumeUsecaseExecuteInput): Promise<void>;
}

export class DefaultDeleteResumeUsecase extends DefaultCommonResumeUsecase implements DeleteResumeUsecase {
	constructor(private readonly ports: DeleteResumePorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	async execute({ userId, resumeId }: DeleteResumeUsecaseExecuteInput) {
		const currentUser = await this.validateUser({ userId });
		const currentResume = await this.validateResume({ resumeId, userId: currentUser.id });

		if (!currentResume) {
			return new DefaultErrorEntity().sendError('Bad request: Resume not found', 404, 'execute');
		}

		return await this.ports.deleteResume({ resumeId });
	}
}
