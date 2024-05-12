import { Education } from '../../../../core/domain/types';

export interface DeleteEducationPorts {
	deleteEducation(input: DeleteEducationPortsInput): Promise<void>;
	deleteEducationFromResume(input: DeleteEducationFromResumePortsInput): Promise<void>;
	deleteSchools(input: DeleteSchoolsPortsInput): Promise<void>;
	getEducation(input: GetEducationPortsInput): Promise<Education | null>;
}

export interface GetEducationPortsInput {
	educationResumeId: string;
}

export interface DeleteEducationPortsInput {
	educationResumeId: string;
}

export interface DeleteSchoolsPortsInput {
	schoolsIds: string[];
}

export interface DeleteEducationFromResumePortsInput {
	resumeId: string;
}
