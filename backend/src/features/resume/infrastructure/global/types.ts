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
}

export interface DeleteResumeInfrastructureInput {
	resumeId: string;
}
