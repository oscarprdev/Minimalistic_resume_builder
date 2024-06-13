import { UpdateResumeUsecaseExecuteDataInput } from './update_resume.use-case';

export interface UpdateResumePorts {
	updateResume(input: UpdateResumePortsInput): Promise<string>;
}

export interface UpdateResumePortsInput {
	resumeId: string;
	data: UpdateResumeUsecaseExecuteDataInput;
}
