import { Experience } from '../../../../core/domain/types';
import { ExperienceResumeDatabase } from '../../../infrastructure/experience';
import {
	DeleteExperienceFromResumePortsInput,
	DeleteExperiencePorts,
	DeleteExperiencePortsInput,
	DeleteJobsPortsInput,
	GetExperiencePortsInput,
} from './delete_experience.ports';

export class DeleteExperienceAdapter implements DeleteExperiencePorts {
	constructor(private readonly database: ExperienceResumeDatabase) {}

	async deleteExperience({ experienceResumeId }: DeleteExperiencePortsInput): Promise<void> {
		await this.database.deleteExperience({ experienceResumeId });
	}

	async deleteExperienceFromResume({ resumeId }: DeleteExperienceFromResumePortsInput): Promise<void> {
		await this.database.deleteExperienceFromResume({ resumeId });
	}

	async deleteJobs({ jobsIds }: DeleteJobsPortsInput): Promise<void> {
		await this.database.deleteJobs({ jobsIds });
	}

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
