import { generateUUID } from '../../../../core/application/utils/generateUuid';
import { Experience } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { CreateExperiencePorts } from './create_experience.ports';

interface CreateExperienceUsecaseExecuteInput {
	userId: string;
	resumeId: string;
	data: Experience;
}

export interface CreateExperienceUsecase {
	execute(input: CreateExperienceUsecaseExecuteInput): Promise<void>;
}

export class DefaultCreateExperienceUsecase extends DefaultCommonResumeUsecase implements CreateExperienceUsecase {
	constructor(private readonly ports: CreateExperiencePorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async createNewExperience(experienceResumeId: string, resumeId: string, data: Experience) {
		await this.ports.createExperience({ experienceResumeId, data });
		await this.ports.insertExperienceIntoResume({ experienceResumeId, resumeId });
	}

	async execute({ userId, resumeId, data }: CreateExperienceUsecaseExecuteInput) {
		const currentUser = await this.validateUser({ userId });
		const currentResume = await this.validateResume({ resumeId, userId: currentUser.id });

		if (!currentResume) {
			const newResumeId = generateUUID();
			await this.createResume({ resumeId: newResumeId, ownerId: currentUser.id });
			return await this.createNewExperience(generateUUID(), newResumeId, data);
		}

		if (!currentResume.experience) {
			return await this.createNewExperience(generateUUID(), currentResume.id, data);
		}

		return await this.ports.updateExperience({ experienceResumeId: currentResume.experience, data });
	}
}
