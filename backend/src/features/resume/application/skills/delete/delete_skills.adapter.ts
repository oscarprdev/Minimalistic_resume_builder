import { Skills } from '../../../../core/domain/types';
import { SkillsResumeDatabase } from '../../../infrastructure/skills';
import {
	DeleteSkillsFromResumePortsInput,
	DeleteSkillsPorts,
	DeleteSkillsPortsInput,
	GetSkillsPortsInput,
	DeleteSkillsSectionPortsInput,
} from './delete_skills.ports';

export class DeleteSkillsAdapter implements DeleteSkillsPorts {
	constructor(private readonly database: SkillsResumeDatabase) {}

	async deleteSkillsSection({ skillsResumeId }: DeleteSkillsSectionPortsInput): Promise<void> {
		await this.database.deleteSkillsSection({ skillsResumeId });
	}

	async deleteSkillsFromResume({ resumeId }: DeleteSkillsFromResumePortsInput): Promise<void> {
		await this.database.deleteSkillsFromResume({ resumeId });
	}

	async deleteSkills({ skillsIds }: DeleteSkillsPortsInput): Promise<void> {
		await this.database.deleteSkills({ skillsIds });
	}

	async getSkills({ skillsResumeId }: GetSkillsPortsInput): Promise<Skills | null> {
		const skillsDb = await this.database.getSkills({ skillsResumeId });

		if (!skillsDb) return null;

		return {
			id: skillsDb.id,
			title: skillsDb.title,
			isHidden: skillsDb.isHidden,
			skillList: skillsDb.skillList.every((skill) => !skill.id) ? [] : skillsDb.skillList,
		};
	}
}
