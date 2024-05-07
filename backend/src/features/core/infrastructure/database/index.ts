import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import { Env } from '../../../..';

export class Database {
	protected sql: NeonQueryFunction<false, false>;

	constructor(env: Env) {
		this.sql = neon(env.DATABASE_URL);
	}

	async query(query: string, params?: string[]) {
		if (params && Array.isArray(params)) {
			return await this.sql(query, params);
		}

		return await this.sql(query);
	}
}
