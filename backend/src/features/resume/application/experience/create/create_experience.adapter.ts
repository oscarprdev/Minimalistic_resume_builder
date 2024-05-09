import { Job } from '../../../../core/domain/types';
import { ExperienceResumeDatabase } from '../../../infrastructure/experience';
import {
	CreateExperiencePorts,
	CreateExperiencePortsInput,
	DeleteJobsPortsInput,
	GetJobsPortsInput,
	InsertExperienceIntoResumePortsInput,
	UpdateExperiencePortsInput,
} from './create_experience.ports';

export class CreateExperienceAdapter implements CreateExperiencePorts {
	constructor(private readonly database: ExperienceResumeDatabase) {}

	async getJobs({ experienceResumeId }: GetJobsPortsInput): Promise<[] | string[]> {
		const jobsdb = await this.database.getJobs({ experienceResumeId });

		return jobsdb.map((jobDb) => jobDb.id);
	}

	async deleteJobs({ jobsIds }: DeleteJobsPortsInput): Promise<void> {
		await this.database.deleteJobs({ jobsIds });
	}

	async createExperience({ experienceResumeId, data }: CreateExperiencePortsInput): Promise<void> {
		await this.database.createExperience({ experienceResumeId, data });
	}

	async insertExperienceIntoResume({ experienceResumeId, resumeId }: InsertExperienceIntoResumePortsInput): Promise<void> {
		await this.database.insertExperienceIntoResume({ experienceResumeId, resumeId });
	}

	async updateExperience({ experienceResumeId, data, newJobs }: UpdateExperiencePortsInput): Promise<void> {
		await this.database.updateExperience({ experienceResumeId, data, newJobs });
	}
}
