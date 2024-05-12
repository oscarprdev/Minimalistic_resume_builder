import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { ResumeDb } from '../../domain/types';
import { ErrorActions, ListResumeByUserInfrastructureInput } from './types';

export interface GlobalResumeDatabase {
	listResumeByUser(input: ListResumeByUserInfrastructureInput): Promise<ResumeDb[]>;
}

export class DefaultGlobalResumeDatabase implements GlobalResumeDatabase {
	constructor(private readonly database: Database) {}

	async listResumeByUser({ ownerId }: ListResumeByUserInfrastructureInput): Promise<ResumeDb[]> {
		try {
			const result = await this.database.query(`SELECT * FROM resume WHERE owner = $1;`, [ownerId]);

			return result as ResumeDb[];
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'listResumeByUser');
		}
	}
}
