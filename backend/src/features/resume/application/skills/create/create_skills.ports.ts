import { Skills, Language, Skill } from '../../../../core/domain/types';

export interface CreateSkillsPorts {
	getSkills(input: GetSkillsPortsInput): Promise<string[] | []>;
	deleteSkills(input: DeleteSkillsPortsInput): Promise<void>;
	createSkills(input: CreateSkillsPortsInput): Promise<void>;
	insertSkillsIntoResume(input: InsertSkillsIntoResumePortsInput): Promise<void>;
	updateSkills(input: UpdateSkillsPortsInput): Promise<void>;
}

export interface CreateSkillsPortsInput {
	skillsResumeId: string;
	data: Skills;
}

export interface InsertSkillsIntoResumePortsInput {
	skillsResumeId: string;
	resumeId: string;
}

export interface UpdateSkillsPortsInput {
	skillsResumeId: string;
	data: Skills;
	newSkills: Skill[];
}

export interface GetSkillsPortsInput {
	skillsResumeId: string;
}

export interface DeleteSkillsPortsInput {
	skillsIds: string[];
}
