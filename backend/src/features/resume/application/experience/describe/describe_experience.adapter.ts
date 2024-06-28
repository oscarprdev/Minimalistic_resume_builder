import { Experience } from '../../../../core/domain/types';
import { ExperienceResumeDatabase } from '../../../infrastructure/experience';
import { DescribeExperiencePorts, GetExperiencePortsInput } from './describe_experience.ports';

export class DescribeExperienceAdapter implements DescribeExperiencePorts {
	constructor(private readonly database: ExperienceResumeDatabase) {}

	async getExperience({ experienceResumeId }: GetExperiencePortsInput): Promise<Experience | null> {
		const experienceDb = await this.database.getExperience({ experienceResumeId });

		if (!experienceDb) return null;

		return {
			id: experienceDb.id,
			title: experienceDb.title,
			isHidden: experienceDb.isHidden,
			jobList: experienceDb.jobList.every((job) => !job.id) ? [] : experienceDb.jobList,
		};
	}
}
