import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { ResumeDb, UserDb } from '../../domain/types';
import { CommonResumePorts } from './common.ports';

export interface CommonResumeUsecase {
	validateUser(userId: string): Promise<UserDb>;
	validateResume(resumeId: string, currentUser: UserDb): Promise<ResumeDb | null>;
}

type CommonUseCaseActions = 'validateUser' | 'validateResume';

export class DefaultCommonResumeUsecase implements CommonResumeUsecase {
	constructor(protected readonly commonPorts: CommonResumePorts) {}

	async validateUser(userId: string): Promise<UserDb> {
		const currentUser = await this.commonPorts.getUser({ userId });

		if (!currentUser) {
			return new DefaultErrorEntity().sendError<CommonUseCaseActions>('Bad request: User not found', 400, 'validateUser');
		}

		return currentUser;
	}

	async validateResume(resumeId: string, currentUser: UserDb): Promise<ResumeDb | null> {
		const currentResume = await this.commonPorts.getResume({ resumeId });

		if (currentResume && currentUser?.id !== currentResume?.owner) {
			return new DefaultErrorEntity().sendError<CommonUseCaseActions>(
				'Bad request: Resume and User are not connected',
				400,
				'validateResume'
			);
		}

		return currentResume;
	}
}
