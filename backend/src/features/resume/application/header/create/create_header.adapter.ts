import { ResumeDb } from '../../../domain/types';
import { ResumeDatabase } from '../../../infrastructure';
import { CreateHeaderPorts, CreateHeaderPortsInput, GetResumeInput } from './create_header.ports';

export class CreateHeaderAdapter implements CreateHeaderPorts {
	constructor(private readonly database: ResumeDatabase) {}

	async getResume({ resumeId }: GetResumeInput): Promise<ResumeDb> {
		return await this.database.getResume({ resumeId });
	}

	async createHeader({ userId, resumeId, data }: CreateHeaderPortsInput): Promise<void> {
		await this.database.createHeader({ userId, resumeId, data });
	}
}
