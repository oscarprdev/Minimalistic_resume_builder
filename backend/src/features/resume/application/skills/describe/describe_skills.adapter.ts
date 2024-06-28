import { Skills } from '../../../../core/domain/types';
import { SkillsResumeDatabase } from '../../../infrastructure/skills';
import { DescribeSkillsPorts, GetSkillsPortsInput } from './describe_skills.ports';

export class DescribeSkillsAdapter implements DescribeSkillsPorts {
	constructor(private readonly database: SkillsResumeDatabase) {}

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
