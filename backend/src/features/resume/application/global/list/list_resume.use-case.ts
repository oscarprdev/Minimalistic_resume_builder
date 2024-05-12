import { Resume } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { ListResumePorts } from './list_resume.ports';

export interface ListResumeUsecaseInput {
	userId: string;
}

export interface ListResumeUsecase {
	execute(input: ListResumeUsecaseInput): Promise<Resume[]>;
}

export class DefaultListResumeUsecase extends DefaultCommonResumeUsecase implements ListResumeUsecase {
	constructor(private readonly ports: ListResumePorts, readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	async execute({ userId }: ListResumeUsecaseInput): Promise<Resume[]> {
		const currentUser = await this.validateUser({ userId });

		return await this.ports.listResume({ ownerId: currentUser.id });
	}
}
