import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Experience } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DeleteExperiencePorts } from './delete_experience.ports';

interface DeleteExperienceUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DeleteExperienceUsecaseAction = 'provideExperienceId' | 'provideExperienceData';

export interface DeleteExperienceUsecase {
	execute(input: DeleteExperienceUsecaseExecuteInput): Promise<void>;
}

export class DefaultDeleteExperienceUsecase extends DefaultCommonResumeUsecase implements DeleteExperienceUsecase {
	constructor(private readonly ports: DeleteExperiencePorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideExperienceId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.experience) {
			return new DefaultErrorEntity().sendError<DeleteExperienceUsecaseAction>(
				'Experience not stored on a resume',
				404,
				'provideExperienceId'
			);
		}

		return currentResume.experience;
	}

	private async provideExperienceData(experienceResumeId: string): Promise<Experience> {
		const Experience = await this.ports.getExperience({ experienceResumeId });

		if (!Experience) {
			return new DefaultErrorEntity().sendError<DeleteExperienceUsecaseAction>('Experience not found', 404, 'provideExperienceData');
		}

		return Experience;
	}

	async execute({ userId, resumeId }: DeleteExperienceUsecaseExecuteInput): Promise<void> {
		const currentUser = await this.validateUser({ userId });
		const experienceResumeId = await this.provideExperienceId(resumeId, currentUser);
		const { id, jobList } = await this.provideExperienceData(experienceResumeId);

		await this.ports.deleteJobs({ jobsIds: jobList.map((job) => job.id) });
		await this.ports.deleteExperience({ experienceResumeId: id });
		await this.ports.deleteExperienceFromResume({ resumeId });
	}
}
