import { Education, School } from '../../../core/domain/types';

export type ErrorActions =
	| 'getEducation'
	| 'getSchools'
	| 'deleteSchools'
	| 'deleteEducation'
	| 'deleteEducationFromResume'
	| 'createEducation'
	| 'insertEducation'
	| 'updateEducation';

export interface CreateEducationInfrastructureInput {
	educationResumeId: string;
	data: Education;
}

export interface InsertEducationInfrastructureInput {
	educationResumeId: string;
	resumeId: string;
}

export interface GetEducationInfrastructureInput {
	educationResumeId: string;
}

export interface GetSchoolsInfrastructureInput {
	educationResumeId: string;
}

export interface UpdateEducationInfrastructureInput {
	educationResumeId: string;
	data: Education;
	newSchools: School[];
}

export interface DeleteSchoolsInfrastructureInput {
	schoolsIds: string[];
}

export interface DeleteEducationInfrastructureInput {
	educationResumeId: string;
}

export interface DeleteEducationFromResumeInfrastructureInput {
	resumeId: string;
}
