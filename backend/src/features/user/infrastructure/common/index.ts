import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { UserDb } from '../../domain/types';
import { ErrorActions, GetUserByUsernameInfrastructureInput } from './types';

export interface CommonUserDatabase {
	getUserByUsername(input: GetUserByUsernameInfrastructureInput): Promise<UserDb>;
}

export class DefaultCommonUserDatabase implements CommonUserDatabase {
	constructor(private readonly database: Database) {}

	async getUserByUsername({ username }: GetUserByUsernameInfrastructureInput): Promise<UserDb> {
		try {
			const result = await this.database.query(`SELECT * FROM users WHERE username = $1;`, [username]);

			return result[0] as UserDb;
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getUserByUsername');
		}
	}
}
