import { Skills, Skill } from '../../../core/domain/types';

export type ErrorActions =
	| 'getSkills'
	| 'getSkills'
	| 'deleteSkills'
	| 'deleteSkillsSection'
	| 'deleteSkillsFromResume'
	| 'createSkills'
	| 'insertSkills'
	| 'updateSkills';

export interface CreateSkillsInfrastructureInput {
	skillsResumeId: string;
	data: Skills;
}

export interface InsertSkillsInfrastructureInput {
	skillsResumeId: string;
	resumeId: string;
}

export interface GetSkillsInfrastructureInput {
	skillsResumeId: string;
}

export interface GetSkillInfrastructureInput {
	skillsResumeId: string;
}

export interface UpdateSkillsInfrastructureInput {
	skillsResumeId: string;
	data: Skills;
	newSkills: Skill[];
}

export interface DeleteSkillsInfrastructureInput {
	skillsIds: string[];
}

export interface DeleteSkillsSectionInfrastructureInput {
	skillsResumeId: string;
}

export interface DeleteSkillsFromResumeInfrastructureInput {
	resumeId: string;
}
