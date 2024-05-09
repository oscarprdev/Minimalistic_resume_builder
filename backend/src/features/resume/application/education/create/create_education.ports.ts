import { Education, School } from '../../../../core/domain/types';

export interface CreateEducationPorts {
	getSchools(input: GetSchoolsPortsInput): Promise<string[] | []>;
	deleteSchools(input: DeleteSchoolsPortsInput): Promise<void>;
	createEducation(input: CreateEducationPortsInput): Promise<void>;
	insertEducationIntoResume(input: InsertEducationIntoResumePortsInput): Promise<void>;
	updateEducation(input: UpdateEducationPortsInput): Promise<void>;
}

export interface CreateEducationPortsInput {
	educationResumeId: string;
	data: Education;
}

export interface InsertEducationIntoResumePortsInput {
	educationResumeId: string;
	resumeId: string;
}

export interface UpdateEducationPortsInput {
	educationResumeId: string;
	data: Education;
	newSchools: School[];
}

export interface GetSchoolsPortsInput {
	educationResumeId: string;
}

export interface DeleteSchoolsPortsInput {
	schoolsIds: string[];
}
