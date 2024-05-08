export type ErrorActions = 'getUser' | 'getResume' | 'createResume';

export interface GetUserInfrastructureInput {
	userId: string;
}

export interface GetResumeInfrastructureInput {
	resumeId: string;
}

export interface CreateResumeInfrastructureInput {
	resumeId: string;
	ownerId: string;
}
