import { Header } from '../../../../core/domain/types';
import { ResumeDb } from '../../../domain/types';

export interface CreateHeaderPorts {
	getResume(input: GetResumeInput): Promise<ResumeDb>;
	createHeader(input: CreateHeaderPortsInput): Promise<void>;
}

export interface CreateHeaderPortsInput {
	userId: string;
	resumeId: string;
	data: Header;
}

export interface GetResumeInput {
	resumeId: string;
}
