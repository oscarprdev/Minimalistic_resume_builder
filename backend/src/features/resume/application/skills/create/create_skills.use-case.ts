import { generateUUID } from '../../../../core/application/utils/generateUuid';
import { Skills, Skill } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { CreateSkillsPorts } from './create_skills.ports';

interface CreateSkillsUsecaseExecuteInput {
	userId: string;
	resumeId: string;
	data: Skills;
}

export interface CreateSkillsUsecase {
	execute(input: CreateSkillsUsecaseExecuteInput): Promise<void>;
}

export class DefaultCreateSkillsUsecase extends DefaultCommonResumeUsecase implements CreateSkillsUsecase {
	constructor(
		private readonly ports: CreateSkillsPorts,
		protected readonly commonPorts: CommonResumePorts
	) {
		super(commonPorts);
	}

	private async createNewSkills(skillsResumeId: string, resumeId: string, data: Skills) {
		await this.ports.createSkills({ skillsResumeId, data });
		await this.ports.insertSkillsIntoResume({ skillsResumeId, resumeId });
	}

	private async deleteOldSkills(skillsResumeId: string, data: Skills) {
		const currentSkillsIds = await this.ports.getSkills({ skillsResumeId });
		if (data.skillList.length === 0 || data.skillList.every((skill) => !skill.id)) {
			return await this.ports.deleteSkills({ skillsIds: currentSkillsIds });
		}

		const skillsToDelete = currentSkillsIds.filter(
			(currentSkillId) => !Boolean(data.skillList.map((skill) => skill.id).includes(currentSkillId))
		);

		await this.ports.deleteSkills({ skillsIds: skillsToDelete });
	}

	private async updateSkillsInfo(skillsResumeId: string, data: Skills) {
		await this.deleteOldSkills(skillsResumeId, data);

		const skillsToUpdate: Skill[] = data.skillList.filter((skill) => Boolean('id' in skill));
		const newSkills: Skill[] = data.skillList.filter((skill) => !Boolean('id' in skill));
		const payloadData = {
			...data,
			skillList: skillsToUpdate,
		} satisfies Skills;

		await this.ports.updateSkills({ skillsResumeId, data: payloadData, newSkills });
	}

	async execute({ userId, resumeId, data }: CreateSkillsUsecaseExecuteInput) {
		const currentUser = await this.validateUser({ userId });
		const currentResume = await this.validateResume({ resumeId, userId: currentUser.id });

		if (!currentResume) {
			await this.createResume({ resumeId, ownerId: currentUser.id });
			return await this.createNewSkills(generateUUID(), resumeId, data);
		}

		if (!currentResume.skills) {
			return await this.createNewSkills(generateUUID(), currentResume.id, data);
		}

		return await this.updateSkillsInfo(currentResume.skills, data);
	}
}
