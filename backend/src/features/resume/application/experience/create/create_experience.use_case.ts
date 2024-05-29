import { generateUUID } from '../../../../core/application/utils/generateUuid';
import { Experience, Job } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { CreateExperiencePorts } from './create_experience.ports';

interface CreateExperienceUsecaseExecuteInput {
	userId: string;
	resumeId: string;
	data: Experience;
}

export interface CreateExperienceUsecase {
	execute(input: CreateExperienceUsecaseExecuteInput): Promise<void>;
}

export class DefaultCreateExperienceUsecase extends DefaultCommonResumeUsecase implements CreateExperienceUsecase {
	constructor(
		private readonly ports: CreateExperiencePorts,
		protected readonly commonPorts: CommonResumePorts
	) {
		super(commonPorts);
	}

	private async createNewExperience(experienceResumeId: string, resumeId: string, data: Experience) {
		await this.ports.createExperience({ experienceResumeId, data });
		await this.ports.insertExperienceIntoResume({ experienceResumeId, resumeId });
	}

	private async deleteOldJobs(experienceResumeId: string, data: Experience) {
		const currentJobsIds = await this.ports.getJobs({ experienceResumeId });
		if (data.jobList.length === 0 || data.jobList.every((jb) => !jb.id)) {
			return await this.ports.deleteJobs({ jobsIds: currentJobsIds });
		}

		const jobsToDelete = currentJobsIds.filter((currentJobId) => !Boolean(data.jobList.map((job) => job.id).includes(currentJobId)));

		await this.ports.deleteJobs({ jobsIds: jobsToDelete });
	}

	private async updateExperienceInfo(experienceResumeId: string, data: Experience) {
		await this.deleteOldJobs(experienceResumeId, data);

		const jobsToUpdate: Job[] = data.jobList.filter((jb) => Boolean('id' in jb));
		const newJobs: Job[] = data.jobList.filter((jb) => !Boolean('id' in jb));
		const payloadData = {
			...data,
			jobList: jobsToUpdate,
		} satisfies Experience;

		await this.ports.updateExperience({ experienceResumeId, data: payloadData, newJobs });
	}

	async execute({ userId, resumeId, data }: CreateExperienceUsecaseExecuteInput) {
		const currentUser = await this.validateUser({ userId });
		const currentResume = await this.validateResume({ resumeId, userId: currentUser.id });

		if (!currentResume) {
			await this.createResume({ resumeId, ownerId: currentUser.id });
			return await this.createNewExperience(generateUUID(), resumeId, data);
		}

		if (!currentResume.experience) {
			return await this.createNewExperience(generateUUID(), currentResume.id, data);
		}

		return await this.updateExperienceInfo(currentResume.experience, data);
	}
}
