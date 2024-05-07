export type ErrorActions = 'getUser' | 'getResume';

export interface GetUserInfrastructureInput {
	userId: string;
}

export interface GetResumeInfrastructureInput {
	resumeId: string;
}
