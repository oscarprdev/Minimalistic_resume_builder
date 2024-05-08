export type CommonUseCaseActions = 'validateUser' | 'validateResume';

export interface ValidateUserInput {
	userId: string;
}
export interface ValidateResumeInput {
	resumeId: string;
	userId: string;
}

export interface CreateResumeInput {
	resumeId: string;
	ownerId: string;
}
