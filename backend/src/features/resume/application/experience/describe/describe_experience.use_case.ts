import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Experience } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DescribeExperiencePorts } from './describe_experience.ports';

interface DescribeExperienceUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DescribeExperienceUsecaseAction = 'provideExperienceId' | 'provideExperienceData';

export interface DescribeExperienceUsecase {
	execute(input: DescribeExperienceUsecaseExecuteInput): Promise<Experience>;
}

export class DefaultDescribeExperienceUsecase extends DefaultCommonResumeUsecase implements DescribeExperienceUsecase {
	constructor(
		private readonly ports: DescribeExperiencePorts,
		protected readonly commonPorts: CommonResumePorts
	) {
		super(commonPorts);
	}

	private async provideExperienceId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.experience) {
			return new DefaultErrorEntity().sendError<DescribeExperienceUsecaseAction>(
				'Experience not stored on a resume',
				404,
				'provideExperienceId'
			);
		}

		return currentResume.experience;
	}

	private async provideExperienceData(experienceResumeId: string): Promise<Experience> {
		const experience = await this.ports.getExperience({ experienceResumeId });

		if (!experience) {
			return new DefaultErrorEntity().sendError<DescribeExperienceUsecaseAction>('Experience not found', 404, 'provideExperienceData');
		}

		return experience;
	}

	async execute({ userId, resumeId }: DescribeExperienceUsecaseExecuteInput): Promise<Experience> {
		const currentUser = await this.validateUser({ userId });
		const experienceResumeId = await this.provideExperienceId(resumeId, currentUser);

		return await this.provideExperienceData(experienceResumeId);
	}
}
