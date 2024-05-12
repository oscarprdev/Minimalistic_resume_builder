import { GlobalResumeDatabase } from '../../../infrastructure/global';
import { DeleteResumePorts, DeleteResumePortsInput } from './delete_resume.ports';

export class DeleteResumeAdapter implements DeleteResumePorts {
	constructor(private readonly globalDb: GlobalResumeDatabase) {}

	async deleteResume({ resumeId }: DeleteResumePortsInput): Promise<void> {
		await this.globalDb.deleteResume({ resumeId });
	}
}
