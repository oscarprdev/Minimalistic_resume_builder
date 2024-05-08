import { ResumeDb, UserDb } from '../../domain/types';
import { CommonResumeDatabase } from '../../infrastructure/common';
import { CommonResumePorts, CreateResumeInput, GetResumeInput, GetUserInput } from './common.ports';

export class CommonResumeAdapter implements CommonResumePorts {
	constructor(private readonly database: CommonResumeDatabase) {}

	async getUser({ userId }: GetUserInput): Promise<UserDb | null> {
		const result = await this.database.getUser({ userId });

		if (result === undefined) return null;

		return result;
	}

	async getResume({ resumeId }: GetResumeInput): Promise<ResumeDb | null> {
		const result = await this.database.getResume({ resumeId });

		if (result === undefined) return null;

		return result;
	}

	async createResume({ resumeId, ownerId }: CreateResumeInput): Promise<void> {
		await this.database.createResume({ resumeId, ownerId });
	}
}
