import { ResumeDb, UserDb } from '../../domain/types';

export interface CommonResumePorts {
	getUser(input: GetUserInput): Promise<UserDb | null>;
	getResume(input: GetResumeInput): Promise<ResumeDb | null>;
}

export interface GetUserInput {
	userId: string;
}

export interface GetResumeInput {
	resumeId: string;
}
