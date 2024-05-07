import { HeaderDb } from '../../../domain/types';
import { HeaderResumeDatabase } from '../../../infrastructure/header';
import {
	CreateHeaderPorts,
	CreateHeaderPortsInput,
	CreateResumeInput,
	GetHeaderPortsInput,
	InsertHeaderPortsInput,
	UpdateHeaderPortsInput,
} from './create_header.ports';

export class CreateHeaderAdapter implements CreateHeaderPorts {
	constructor(private readonly database: HeaderResumeDatabase) {}

	async createResume({ resumeId, ownerId }: CreateResumeInput): Promise<void> {
		return await this.database.createResume({ resumeId, ownerId });
	}

	async getHeader({ headerResumeId }: GetHeaderPortsInput): Promise<HeaderDb | null> {
		const result = await this.database.getHeader({ headerResumeId });

		if (result === undefined) return null;

		return result;
	}

	async createHeader({ headerResumeId, data }: CreateHeaderPortsInput): Promise<void> {
		await this.database.createHeader({ headerResumeId, data: { ...data, links: JSON.stringify(data.links) } });
	}

	async insertHeader({ headerResumeId, resumeId }: InsertHeaderPortsInput): Promise<void> {
		await this.database.insertHeader({ headerResumeId, resumeId });
	}

	async updateHeader({ headerResumeId, data }: UpdateHeaderPortsInput): Promise<void> {
		await this.database.updateHeader({ headerResumeId, data: { ...data, links: JSON.stringify(data.links) } });
	}
}
