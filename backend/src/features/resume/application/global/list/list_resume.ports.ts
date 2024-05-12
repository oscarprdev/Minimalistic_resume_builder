import { Resume } from '../../../../core/domain/types';

export interface ListResumePorts {
	listResume(input: ListResumePortsInput): Promise<Resume[]>;
}

export interface ListResumePortsInput {
	ownerId: string;
}
