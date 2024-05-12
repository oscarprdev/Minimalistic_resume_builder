import { Header } from '../../../../core/domain/types';

export interface DeleteHeaderPorts {
	deleteHeader(input: DeleteHeaderPortsInput): Promise<void>;
	deleteHeaderFromResume(input: DeleteHeaderFromResumePortsInput): Promise<void>;
	getHeader(input: GetHeaderPortsInput): Promise<Header | null>;
}

export interface GetHeaderPortsInput {
	headerResumeId: string;
}

export interface DeleteHeaderPortsInput {
	headerResumeId: string;
}

export interface DeleteHeaderFromResumePortsInput {
	resumeId: string;
}
