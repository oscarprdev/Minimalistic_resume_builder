import { Education } from '../../../../core/domain/types';
import { EducationResumeDatabase } from '../../../infrastructure/education';
import { DescribeEducationPorts, GetEducationPortsInput } from './describe_education.ports';

export class DescribeEducationAdapter implements DescribeEducationPorts {
	constructor(private readonly database: EducationResumeDatabase) {}

	async getEducation({ educationResumeId }: GetEducationPortsInput): Promise<Education | null> {
		const educationDb = await this.database.getEducation({ educationResumeId });

		if (!educationDb) return null;

		return {
			id: educationDb.id,
			title: educationDb.title,
			isHidden: educationDb.isHidden,
			educationList: educationDb.educationList.every((school) => !school.id) ? [] : educationDb.educationList,
		};
	}
}
