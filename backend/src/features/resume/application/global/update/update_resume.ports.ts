import { Resume } from '../../../../core/domain/types';

export interface UpdateResumePorts {
	updateResume(input: UpdateResumePortsInput): Promise<void>;
}

export interface UpdateResumePortsInput {
	resumeId: string;
	data: Resume;
}
