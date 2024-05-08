import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { ResumeDb, UserDb } from '../../domain/types';
import { CommonResumePorts, CreateResumeInput } from './common.ports';
import { CommonUseCaseActions, ValidateResumeInput, ValidateUserInput } from './common.use_case.types';

export interface CommonResumeUsecase {
	validateUser(input: ValidateUserInput): Promise<UserDb>;
	validateResume(input: ValidateResumeInput): Promise<ResumeDb | null>;
	createResume(input: CreateResumeInput): Promise<void>;
}

export class DefaultCommonResumeUsecase implements CommonResumeUsecase {
	constructor(protected readonly commonPorts: CommonResumePorts) {}

	async validateUser({ userId }: ValidateUserInput): Promise<UserDb> {
		const currentUser = await this.commonPorts.getUser({ userId });

		if (!currentUser) {
			return new DefaultErrorEntity().sendError<CommonUseCaseActions>('Bad request: User not found', 400, 'validateUser');
		}

		return currentUser;
	}

	async validateResume({ resumeId, userId }: ValidateResumeInput): Promise<ResumeDb | null> {
		const currentResume = await this.commonPorts.getResume({ resumeId });

		if (currentResume && userId !== currentResume?.owner) {
			return new DefaultErrorEntity().sendError<CommonUseCaseActions>(
				'Bad request: Resume and User are not connected',
				400,
				'validateResume'
			);
		}

		return currentResume;
	}

	async createResume({ resumeId, ownerId }: CreateResumeInput): Promise<void> {
		await this.commonPorts.createResume({ resumeId, ownerId });
	}
}
