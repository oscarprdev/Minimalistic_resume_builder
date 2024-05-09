import { EducationResumeDatabase } from '../../../infrastructure/education';
import {
	CreateEducationPorts,
	CreateEducationPortsInput,
	DeleteSchoolsPortsInput,
	GetSchoolsPortsInput,
	InsertEducationIntoResumePortsInput,
	UpdateEducationPortsInput,
} from './create_education.ports';

export class CreateEducationAdapter implements CreateEducationPorts {
	constructor(private readonly database: EducationResumeDatabase) {}

	async getSchools({ educationResumeId }: GetSchoolsPortsInput): Promise<[] | string[]> {
		const schoolsDb = await this.database.getSchools({ educationResumeId });

		return schoolsDb.map((schoolDb) => schoolDb.id);
	}

	async deleteSchools({ schoolsIds }: DeleteSchoolsPortsInput): Promise<void> {
		await this.database.deleteSchools({ schoolsIds });
	}

	async createEducation({ educationResumeId, data }: CreateEducationPortsInput): Promise<void> {
		await this.database.createEducation({ educationResumeId, data });
	}

	async insertEducationIntoResume({ educationResumeId, resumeId }: InsertEducationIntoResumePortsInput): Promise<void> {
		await this.database.insertEducationIntoResume({ educationResumeId, resumeId });
	}

	async updateEducation({ educationResumeId, data, newSchools }: UpdateEducationPortsInput): Promise<void> {
		await this.database.updateEducation({ educationResumeId, data, newSchools });
	}
}
