import { HeaderResumeDatabase } from '../../../infrastructure/header';
import { CreateHeaderPorts, CreateHeaderPortsInput, InsertHeaderIntoResumePortsInput, UpdateHeaderPortsInput } from './create_header.ports';

export class CreateHeaderAdapter implements CreateHeaderPorts {
	constructor(private readonly database: HeaderResumeDatabase) {}

	async createHeader({ headerResumeId, data }: CreateHeaderPortsInput): Promise<void> {
		await this.database.createHeader({ headerResumeId, data: { ...data, links: JSON.stringify(data.links) } });
	}

	async insertHeaderIntoResume({ headerResumeId, resumeId }: InsertHeaderIntoResumePortsInput): Promise<void> {
		await this.database.insertHeaderIntoResume({ headerResumeId, resumeId });
	}

	async updateHeader({ headerResumeId, data }: UpdateHeaderPortsInput): Promise<void> {
		await this.database.updateHeader({ headerResumeId, data: { ...data, links: JSON.stringify(data.links) } });
	}
}
