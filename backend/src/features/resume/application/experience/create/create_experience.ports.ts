import { Experience, Job } from '../../../../core/domain/types';

export interface CreateExperiencePorts {
	getJobs(input: GetJobsPortsInput): Promise<string[] | []>;
	deleteJobs(input: DeleteJobsPortsInput): Promise<void>;
	createExperience(input: CreateExperiencePortsInput): Promise<void>;
	insertExperienceIntoResume(input: InsertExperienceIntoResumePortsInput): Promise<void>;
	updateExperience(input: UpdateExperiencePortsInput): Promise<void>;
}

export interface CreateExperiencePortsInput {
	experienceResumeId: string;
	data: Experience;
}

export interface InsertExperienceIntoResumePortsInput {
	experienceResumeId: string;
	resumeId: string;
}

export interface UpdateExperiencePortsInput {
	experienceResumeId: string;
	data: Experience;
	newJobs: Job[];
}

export interface GetJobsPortsInput {
	experienceResumeId: string;
}

export interface DeleteJobsPortsInput {
	jobsIds: string[];
}
