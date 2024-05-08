import { ResumeDb, UserDb } from '../../domain/types';

export interface CommonResumePorts {
	getUser(input: GetUserInput): Promise<UserDb | null>;
	getResume(input: GetResumeInput): Promise<ResumeDb | null>;
	createResume(input: CreateResumeInput): Promise<void>;
}

export interface GetUserInput {
	userId: string;
}

export interface GetResumeInput {
	resumeId: string;
}

export interface CreateResumeInput {
	resumeId: string;
	ownerId: string;
}
