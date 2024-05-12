import { Resume } from '../../../../core/domain/types';
import { GlobalResumeDatabase } from '../../../infrastructure/global';
import { ListResumePorts, ListResumePortsInput } from './list_resume.ports';

export class ListResumeAdapter implements ListResumePorts {
	constructor(private readonly database: GlobalResumeDatabase) {}

	async listResume({ ownerId }: ListResumePortsInput): Promise<Resume[]> {
		const result = await this.database.listResumeByUser({ ownerId });

		return result.map((res) => ({ id: res.id, title: res.title }));
	}
}
