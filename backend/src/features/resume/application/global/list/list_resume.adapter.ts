import { Resume } from '../../../../core/domain/types';
import { GlobalResumeDatabase } from '../../../infrastructure/global';
import { ListResumePorts, ListResumePortsInput } from './list_resume.ports';

export class ListResumeAdapter implements ListResumePorts {
	constructor(private readonly database: GlobalResumeDatabase) {}

	async listResume({ ownerId }: ListResumePortsInput): Promise<Resume[]> {
		const result = await this.database.listResumeByUser({ ownerId });

		return result.map((res) => ({
			id: res.id,
			title: res.title,
			header: Boolean(res.header),
			summary: Boolean(res.summary),
			education: Boolean(res.education),
			experience: Boolean(res.experience),
			languages: Boolean(res.languages),
			skills: Boolean(res.skills),
			theme: res.theme,
			image: res.image,
		}));
	}
}
