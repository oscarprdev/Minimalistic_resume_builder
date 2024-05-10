import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Skills } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DescribeSkillsPorts } from './describe_skills.ports';

interface DescribeSkillsUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DescribeSkillsUsecaseAction = 'provideSkillsId' | 'provideSkillsData';

export interface DescribeSkillsUsecase {
	execute(input: DescribeSkillsUsecaseExecuteInput): Promise<Skills>;
}

export class DefaultDescribeSkillsUsecase extends DefaultCommonResumeUsecase implements DescribeSkillsUsecase {
	constructor(private readonly ports: DescribeSkillsPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideSkillsId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.skills) {
			return new DefaultErrorEntity().sendError<DescribeSkillsUsecaseAction>('Skills not stored on a resume', 404, 'provideSkillsId');
		}

		return currentResume.skills;
	}

	private async provideSkillsData(skillsResumeId: string): Promise<Skills> {
		const skills = await this.ports.getSkills({ skillsResumeId });

		if (!skills) {
			return new DefaultErrorEntity().sendError<DescribeSkillsUsecaseAction>('Skills not found', 404, 'provideSkillsData');
		}

		return skills;
	}

	async execute({ userId, resumeId }: DescribeSkillsUsecaseExecuteInput): Promise<Skills> {
		const currentUser = await this.validateUser({ userId });
		const skillsResumeId = await this.provideSkillsId(resumeId, currentUser);

		return await this.provideSkillsData(skillsResumeId);
	}
}
