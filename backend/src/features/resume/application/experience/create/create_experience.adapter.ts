import { ExperienceResumeDatabase } from '../../../infrastructure/experience';
import {
	CreateExperiencePorts,
	CreateExperiencePortsInput,
	InsertExperienceIntoResumePortsInput,
	UpdateExperiencePortsInput,
} from './create_experience.ports';

export class CreateExperienceAdapter implements CreateExperiencePorts {
	constructor(private readonly database: ExperienceResumeDatabase) {}

	async createExperience({ experienceResumeId, data }: CreateExperiencePortsInput): Promise<void> {
		await this.database.createExperience({ experienceResumeId, data });
	}

	async insertExperienceIntoResume({ experienceResumeId, resumeId }: InsertExperienceIntoResumePortsInput): Promise<void> {
		await this.database.insertExperienceIntoResume({ experienceResumeId, resumeId });
	}

	async updateExperience({ experienceResumeId, data }: UpdateExperiencePortsInput): Promise<void> {
		await this.database.updateExperience({ experienceResumeId, data });
	}
}
