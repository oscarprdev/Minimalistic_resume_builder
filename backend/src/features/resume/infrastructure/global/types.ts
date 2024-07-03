import { Resume } from '../../../core/domain/types';

export type ErrorActions = 'listResumeByUser' | 'updateResume' | 'deleteResume' | 'describeResumeById';

export interface ListResumeByUserInfrastructureInput {
	ownerId: string;
}

export interface UpdateResumeInfrastructureInput {
	resumeId: string;
	data: UpdateResumeDataInput;
}

export interface UpdateResumeDataInput {
	title: string;
	theme: Resume.theme;
	image: string;
}

export interface DeleteResumeInfrastructureInput {
	resumeId: string;
}
