import { Experience } from '../../../core/domain/types';

export type ErrorActions = 'getExperience' | 'createExperience' | 'insertExperience' | 'updateExperience';

export interface CreateExperienceInfrastructureInput {
	experienceResumeId: string;
	data: Experience;
}

export interface InsertExperienceInfrastructureInput {
	experienceResumeId: string;
	resumeId: string;
}

export interface GetExperienceInfrastructureInput {
	experienceResumeId: string;
}

export interface UpdateExperienceInfrastructureInput {
	experienceResumeId: string;
	data: Experience;
}
