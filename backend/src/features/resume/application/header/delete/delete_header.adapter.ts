import { Header } from '../../../../core/domain/types';
import { HeaderResumeDatabase } from '../../../infrastructure/header';
import { DeleteHeaderFromResumePortsInput, DeleteHeaderPorts, DeleteHeaderPortsInput, GetHeaderPortsInput } from './delete_header.ports';

export class DeleteHeaderAdapter implements DeleteHeaderPorts {
	constructor(private readonly database: HeaderResumeDatabase) {}

	async deleteHeader({ headerResumeId }: DeleteHeaderPortsInput): Promise<void> {
		await this.database.deleteHeader({ headerResumeId });
	}

	async deleteHeaderFromResume({ resumeId }: DeleteHeaderFromResumePortsInput): Promise<void> {
		await this.database.deleteHeaderFromResume({ resumeId });
	}

	async getHeader({ headerResumeId }: GetHeaderPortsInput): Promise<Header | null> {
		const headerDb = await this.database.getHeader({ headerResumeId });

		if (!headerDb) return null;

		return {
			id: headerDb.id,
			name: headerDb.name,
			job: headerDb.job,
			location: headerDb.location,
			email: headerDb.email,
			phone: headerDb.phone,
			links: headerDb.links,
			...(headerDb.image ? { image: headerDb.image } : {}),
		};
	}
}
