export type ErrorActions = 'listResumeByUser' | 'updateResume';

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
