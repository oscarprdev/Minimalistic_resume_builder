import { Skills } from '../../../../core/domain/types';

export interface DeleteSkillsPorts {
	deleteSkillsSection(input: DeleteSkillsSectionPortsInput): Promise<void>;
	deleteSkillsFromResume(input: DeleteSkillsFromResumePortsInput): Promise<void>;
	deleteSkills(input: DeleteSkillsPortsInput): Promise<void>;
	getSkills(input: GetSkillsPortsInput): Promise<Skills | null>;
}

export interface GetSkillsPortsInput {
	skillsResumeId: string;
}

export interface DeleteSkillsSectionPortsInput {
	skillsResumeId: string;
}

export interface DeleteSkillsPortsInput {
	skillsIds: string[];
}

export interface DeleteSkillsFromResumePortsInput {
	resumeId: string;
}
