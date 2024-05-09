import { Experience } from '../../../../core/domain/types';

export interface CreateExperiencePorts {
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
}
