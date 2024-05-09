import { Experience, Job } from '../../../core/domain/types';

export type ErrorActions = 'getExperience' | 'getJobs' | 'deleteJobs' | 'createExperience' | 'insertExperience' | 'updateExperience';

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

export interface GetJobsInfrastructureInput {
	experienceResumeId: string;
}

export interface UpdateExperienceInfrastructureInput {
	experienceResumeId: string;
	data: Experience;
	newJobs: Job[];
}

export interface DeleteJobsInfrastructureInput {
	jobsIds: string[];
}
