import { generateUuid } from '../../../../core/application/utils/generateUuid';
import { Header } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { CreateHeaderPorts } from './create_header.ports';

interface CreateHeaderUsecaseExecuteInput {
	userId: string;
	resumeId: string;
	data: Header;
}

export interface CreateHeaderUsecase {
	execute(input: CreateHeaderUsecaseExecuteInput): Promise<void>;
}

export class DefaultCreateHeaderUsecase extends DefaultCommonResumeUsecase implements CreateHeaderUsecase {
	constructor(private readonly ports: CreateHeaderPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async createNewHeader(headerResumeId: string, resumeId: string, data: Header) {
		await this.ports.createHeader({ headerResumeId, data });
		await this.ports.insertHeader({ headerResumeId, resumeId });
	}

	async execute({ userId, resumeId, data }: CreateHeaderUsecaseExecuteInput) {
		const currentUser = await this.validateUser(userId);
		const currentResume = await this.validateResume(resumeId, currentUser);

		if (!currentResume) {
			await this.ports.createResume({ resumeId: generateUuid(), ownerId: currentUser.id });
			return await this.createNewHeader(generateUuid(), resumeId, data);
		}

		if (!currentResume.header) {
			return await this.createNewHeader(generateUuid(), currentResume.id, data);
		}

		return await this.ports.updateHeader({ headerResumeId: currentResume.header, data });
	}
}
