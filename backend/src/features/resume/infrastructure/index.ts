import { Resume } from '../../core/domain/types';
import { Database } from '../../core/infrastructure/database';
import { ResumeDb } from '../domain/types';
import { CreateHeaderInfrastructureInput, GetResumeInfrastructureInput } from './types';

export interface ResumeDatabase {
	createHeader(input: CreateHeaderInfrastructureInput): Promise<void>;
	getResume(input: GetResumeInfrastructureInput): Promise<ResumeDb>;
}

export class DefaultResumeDatabase implements ResumeDatabase {
	constructor(private readonly database: Database) {}

	async getResume({ resumeId }: GetResumeInfrastructureInput): Promise<ResumeDb> {
		const result = await this.database.query(`SELECT resume WHERE id = '${resumeId}'`);

		console.log(result);

		return result.rows[0] as ResumeDb;
	}

	async createHeader({ userId, resumeId, data }: CreateHeaderInfrastructureInput): Promise<void> {
		await this.database.query('');
	}
}
