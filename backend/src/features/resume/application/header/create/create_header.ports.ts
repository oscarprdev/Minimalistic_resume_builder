import { Header } from '../../../../core/domain/types';

export interface CreateHeaderPorts {
	createHeader(input: CreateHeaderPortsInput): Promise<void>;
	insertHeaderIntoResume(input: InsertHeaderIntoResumePortsInput): Promise<void>;
	updateHeader(input: UpdateHeaderPortsInput): Promise<void>;
}

export interface CreateHeaderPortsInput {
	headerResumeId: string;
	data: Header;
}

export interface InsertHeaderIntoResumePortsInput {
	headerResumeId: string;
	resumeId: string;
}

export interface UpdateHeaderPortsInput {
	headerResumeId: string;
	data: Header;
}
