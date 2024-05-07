import { Header } from '../../../../core/domain/types';
import { HeaderDb, ResumeDb, UserDb } from '../../../domain/types';

export interface CreateHeaderPorts {
	createResume(input: CreateResumeInput): Promise<void>;

	getHeader(input: GetHeaderPortsInput): Promise<HeaderDb | null>;
	createHeader(input: CreateHeaderPortsInput): Promise<void>;
	insertHeader(input: InsertHeaderPortsInput): Promise<void>;
	updateHeader(input: UpdateHeaderPortsInput): Promise<void>;
}

export interface CreateHeaderPortsInput {
	headerResumeId: string;
	data: Header;
}

export interface CreateResumeInput {
	resumeId: string;
	ownerId: string;
}

export interface InsertHeaderPortsInput {
	headerResumeId: string;
	resumeId: string;
}

export interface GetHeaderPortsInput {
	headerResumeId: string;
}

export interface UpdateHeaderPortsInput {
	headerResumeId: string;
	data: Header;
}
