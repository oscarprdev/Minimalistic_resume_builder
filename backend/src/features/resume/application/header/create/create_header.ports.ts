import { Header } from '../../../../core/domain/types';

export interface CreateHeaderPorts {
	createHeader(input: CreateHeaderPortsInput): Promise<void>;
	insertHeader(input: InsertHeaderPortsInput): Promise<void>;
	updateHeader(input: UpdateHeaderPortsInput): Promise<void>;
}

export interface CreateHeaderPortsInput {
	headerResumeId: string;
	data: Header;
}

export interface InsertHeaderPortsInput {
	headerResumeId: string;
	resumeId: string;
}

export interface UpdateHeaderPortsInput {
	headerResumeId: string;
	data: Header;
}
