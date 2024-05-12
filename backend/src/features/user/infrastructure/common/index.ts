import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { UserDb } from '../../domain/types';
import { ErrorActions, GetUserByUsernameInfrastructureInput, InsertUserInfrastructureInput } from './types';

export interface CommonUserDatabase {
	getUserByUsername(input: GetUserByUsernameInfrastructureInput): Promise<UserDb>;
	insertUser(input: InsertUserInfrastructureInput): Promise<void>;
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

	async insertUser({ id, username, password }: InsertUserInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`INSERT INTO users 
					(id, username, password) 
					VALUES ($1, $2, $3)
				;`,
				[id, username, password]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getUserByUsername');
		}
	}
}
