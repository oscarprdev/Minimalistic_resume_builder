import { Header } from '../../../../core/domain/types';
import { HeaderResumeDatabase } from '../../../infrastructure/header';
import { DescribeHeaderPorts, GetHeaderPortsInput } from './describe_header.ports';

export class DescribeHeaderAdapter implements DescribeHeaderPorts {
	constructor(private readonly database: HeaderResumeDatabase) {}

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
			isHidden: headerDb.isHidden,
			...(headerDb.image ? { image: headerDb.image } : {}),
		};
	}
}
