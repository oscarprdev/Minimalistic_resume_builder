import { GlobalResumeDatabase } from '../../../infrastructure/global';
import { UpdateResumePorts, UpdateResumePortsInput } from './update_resume.ports';

export class UpdateResumeAdapter implements UpdateResumePorts {
	constructor(private readonly database: GlobalResumeDatabase) {}

	async updateResume({ resumeId, data }: UpdateResumePortsInput): Promise<string> {
		await this.database.updateResume({ resumeId, data: { title: data.title, theme: data.theme, image: data.image } });

		return resumeId;
	}
}
