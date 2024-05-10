import { Skills } from '../../../../core/domain/types';

export interface DescribeSkillsPorts {
	getSkills(input: GetSkillsPortsInput): Promise<Skills | null>;
}

export interface GetSkillsPortsInput {
	skillsResumeId: string;
}
