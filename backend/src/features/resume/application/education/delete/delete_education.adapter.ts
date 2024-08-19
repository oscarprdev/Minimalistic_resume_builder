import { Education } from '../../../../core/domain/types';
import { EducationResumeDatabase } from '../../../infrastructure/education';
import {
	DeleteEducationFromResumePortsInput,
	DeleteEducationPorts,
	DeleteEducationPortsInput,
	DeleteSchoolsPortsInput,
	GetEducationPortsInput,
} from './delete_education.ports';

export class DeleteEducationAdapter implements DeleteEducationPorts {
	constructor(private readonly database: EducationResumeDatabase) {}

	async deleteEducation({ educationResumeId }: DeleteEducationPortsInput): Promise<void> {
		await this.database.deleteEducation({ educationResumeId });
	}

	async deleteEducationFromResume({ resumeId }: DeleteEducationFromResumePortsInput): Promise<void> {
		await this.database.deleteEducationFromResume({ resumeId });
	}

	async deleteSchools({ schoolsIds }: DeleteSchoolsPortsInput): Promise<void> {
		await this.database.deleteSchools({ schoolsIds });
	}

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
