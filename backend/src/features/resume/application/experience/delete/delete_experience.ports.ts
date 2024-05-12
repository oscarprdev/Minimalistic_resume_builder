import { Experience } from '../../../../core/domain/types';

export interface DeleteExperiencePorts {
	deleteExperience(input: DeleteExperiencePortsInput): Promise<void>;
	deleteExperienceFromResume(input: DeleteExperienceFromResumePortsInput): Promise<void>;
	deleteJobs(input: DeleteJobsPortsInput): Promise<void>;
	getExperience(input: GetExperiencePortsInput): Promise<Experience | null>;
}

export interface GetExperiencePortsInput {
	experienceResumeId: string;
}

export interface DeleteExperiencePortsInput {
	experienceResumeId: string;
}

export interface DeleteJobsPortsInput {
	jobsIds: string[];
}

export interface DeleteExperienceFromResumePortsInput {
	resumeId: string;
}
