import { DefaultErrorEntity } from '../../../../core/domain/entities/Error';
import { Skills } from '../../../../core/domain/types';
import { UserDb } from '../../../domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { DeleteSkillsPorts } from './delete_skills.ports';

interface DeleteSkillsUsecaseExecuteInput {
	userId: string;
	resumeId: string;
}

type DeleteSkillsUsecaseAction = 'provideSkillsId' | 'provideSkillsData';

export interface DeleteSkillsUsecase {
	execute(input: DeleteSkillsUsecaseExecuteInput): Promise<void>;
}

export class DefaultDeleteSkillsUsecase extends DefaultCommonResumeUsecase implements DeleteSkillsUsecase {
	constructor(private readonly ports: DeleteSkillsPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async provideSkillsId(resumeId: string, user: UserDb): Promise<string> {
		const currentResume = await this.validateResume({ resumeId, userId: user.id });

		if (!currentResume?.skills) {
			return new DefaultErrorEntity().sendError<DeleteSkillsUsecaseAction>('Skills not stored on a resume', 404, 'provideSkillsId');
		}

		return currentResume.skills;
	}

	private async provideSkillsData(skillsResumeId: string): Promise<Skills> {
		const skills = await this.ports.getSkills({ skillsResumeId });

		if (!skills) {
			return new DefaultErrorEntity().sendError<DeleteSkillsUsecaseAction>('Skills not found', 404, 'provideSkillsData');
		}

		return skills;
	}

	async execute({ userId, resumeId }: DeleteSkillsUsecaseExecuteInput): Promise<void> {
		const currentUser = await this.validateUser({ userId });
		const skillsResumeId = await this.provideSkillsId(resumeId, currentUser);
		const { id, skillList } = await this.provideSkillsData(skillsResumeId);

		await this.ports.deleteSkills({ skillsIds: skillList.map((skill) => skill.id) });
		await this.ports.deleteSkillsSection({ skillsResumeId: id });
		await this.ports.deleteSkillsFromResume({ resumeId });
	}
}
