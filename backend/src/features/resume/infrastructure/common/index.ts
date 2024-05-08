import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { ResumeDb, UserDb } from '../../domain/types';
import { CreateResumeInfrastructureInput, ErrorActions, GetResumeInfrastructureInput, GetUserInfrastructureInput } from './types';

export interface CommonResumeDatabase {
	getUser(input: GetUserInfrastructureInput): Promise<UserDb | void>;

	getResume(input: GetResumeInfrastructureInput): Promise<ResumeDb | void>;

	createResume(input: CreateResumeInfrastructureInput): Promise<void>;
}

export class DefaultCommonResumeDatabase implements CommonResumeDatabase {
	constructor(private readonly database: Database) {}

	async getUser({ userId }: GetUserInfrastructureInput): Promise<UserDb | void> {
		try {
			const result = await this.database.query(`SELECT * FROM users WHERE id = $1;`, [userId]);

			if (result.length === 0) {
				return;
			}

			return result[0] as ResumeDb;
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getUser');
		}
	}

	async getResume({ resumeId }: GetResumeInfrastructureInput): Promise<ResumeDb | void> {
		try {
			const result = await this.database.query(`SELECT * FROM resume WHERE id = $1;`, [resumeId]);

			if (result.length === 0) {
				return;
			}

			return result[0] as ResumeDb;
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getResume');
		}
	}

	async createResume({ resumeId, ownerId }: CreateResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(`INSERT INTO resume (id, owner) VALUES ($1, $2);`, [resumeId, ownerId]);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createResume');
		}
	}
}
