import { generateUUID } from '../../../../core/application/utils/generateUuid';
import { Education, School } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { CreateEducationPorts } from './create_education.ports';

interface CreateEducationUsecaseExecuteInput {
	userId: string;
	resumeId: string;
	data: Education;
}

export interface CreateEducationUsecase {
	execute(input: CreateEducationUsecaseExecuteInput): Promise<void>;
}

export class DefaultCreateEducationUsecase extends DefaultCommonResumeUsecase implements CreateEducationUsecase {
	constructor(
		private readonly ports: CreateEducationPorts,
		protected readonly commonPorts: CommonResumePorts
	) {
		super(commonPorts);
	}

	private async createNewEducation(educationResumeId: string, resumeId: string, data: Education) {
		await this.ports.createEducation({ educationResumeId, data });
		await this.ports.insertEducationIntoResume({ educationResumeId, resumeId });
	}

	private async deleteOldSchools(educationResumeId: string, data: Education) {
		const currentSchoolsIds = await this.ports.getSchools({ educationResumeId });
		if (data.educationList.length === 0 || data.educationList.every((school) => !school.id)) {
			return await this.ports.deleteSchools({ schoolsIds: currentSchoolsIds });
		}

		const schoolsToDelete = currentSchoolsIds.filter(
			(currentSchoolId) => !Boolean(data.educationList.map((school) => school.id).includes(currentSchoolId))
		);

		await this.ports.deleteSchools({ schoolsIds: schoolsToDelete });
	}

	private async updateEducationInfo(educationResumeId: string, data: Education) {
		await this.deleteOldSchools(educationResumeId, data);

		const schoolsToUpdate: School[] = data.educationList.filter((school) => Boolean('id' in school));
		const newSchools: School[] = data.educationList.filter((school) => !Boolean('id' in school));
		const payloadData = {
			...data,
			educationList: schoolsToUpdate,
		} satisfies Education;

		await this.ports.updateEducation({ educationResumeId, data: payloadData, newSchools });
	}

	async execute({ userId, resumeId, data }: CreateEducationUsecaseExecuteInput) {
		const currentUser = await this.validateUser({ userId });
		const currentResume = await this.validateResume({ resumeId, userId: currentUser.id });

		if (!currentResume) {
			await this.createResume({ resumeId, ownerId: currentUser.id });
			return await this.createNewEducation(generateUUID(), resumeId, data);
		}

		if (!currentResume.education) {
			return await this.createNewEducation(generateUUID(), currentResume.id, data);
		}

		return await this.updateEducationInfo(currentResume.education, data);
	}
}
