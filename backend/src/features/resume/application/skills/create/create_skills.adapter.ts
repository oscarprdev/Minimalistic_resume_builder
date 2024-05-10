import { SkillsResumeDatabase } from '../../../infrastructure/skills';
import {
	CreateSkillsPorts,
	CreateSkillsPortsInput,
	DeleteSkillsPortsInput,
	GetSkillsPortsInput,
	InsertSkillsIntoResumePortsInput,
	UpdateSkillsPortsInput,
} from './create_skills.ports';

export class CreateSkillsAdapter implements CreateSkillsPorts {
	constructor(private readonly database: SkillsResumeDatabase) {}

	async getSkills({ skillsResumeId }: GetSkillsPortsInput): Promise<[] | string[]> {
		const skillsDb = await this.database.getSkill({ skillsResumeId });

		return skillsDb.map((skillDb) => skillDb.id);
	}

	async deleteSkills({ skillsIds }: DeleteSkillsPortsInput): Promise<void> {
		await this.database.deleteSkills({ skillsIds });
	}

	async createSkills({ skillsResumeId, data }: CreateSkillsPortsInput): Promise<void> {
		await this.database.createSkills({ skillsResumeId, data });
	}

	async insertSkillsIntoResume({ skillsResumeId, resumeId }: InsertSkillsIntoResumePortsInput): Promise<void> {
		await this.database.insertSkillsIntoResume({ skillsResumeId, resumeId });
	}

	async updateSkills({ skillsResumeId, data, newSkills }: UpdateSkillsPortsInput): Promise<void> {
		await this.database.updateSkills({ skillsResumeId, data, newSkills });
	}
}
