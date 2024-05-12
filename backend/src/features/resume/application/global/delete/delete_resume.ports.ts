import { ResumeDb } from '../../../domain/types';

export interface DeleteResumePorts {
	deleteResume(input: DeleteResumePortsInput): Promise<void>;
}

export interface DeleteResumePortsInput {
	resumeId: string;
}
