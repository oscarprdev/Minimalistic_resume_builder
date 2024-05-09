import { Experience } from '../../../../core/domain/types';

export interface DescribeExperiencePorts {
	getExperience(input: GetExperiencePortsInput): Promise<Experience | null>;
}

export interface GetExperiencePortsInput {
	experienceResumeId: string;
}
