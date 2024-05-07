import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { HeaderDb } from '../../domain/types';
import {
	CreateHeaderInfrastructureInput,
	CreateResumeInfrastructureInput,
	ErrorActions,
	GetHeaderInfrastructureInput,
	InsertHeaderInfrastructureInput,
	UpdateHeaderInfrastructureInput,
} from './types';

export interface HeaderResumeDatabase {
	createResume(input: CreateResumeInfrastructureInput): Promise<void>;

	getHeader(input: GetHeaderInfrastructureInput): Promise<HeaderDb | void>;
	createHeader(input: CreateHeaderInfrastructureInput): Promise<void>;
	insertHeader(input: InsertHeaderInfrastructureInput): Promise<void>;
	updateHeader(input: UpdateHeaderInfrastructureInput): Promise<void>;
}

export class DefaultHeaderResumeDatabase implements HeaderResumeDatabase {
	constructor(private readonly database: Database) {}

	async createResume({ resumeId, ownerId }: CreateResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(`INSERT INTO resume (id, owner) VALUES ($1, $2);`, [resumeId, ownerId]);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createResume');
		}
	}

	async getHeader({ headerResumeId }: GetHeaderInfrastructureInput): Promise<HeaderDb | void> {
		try {
			const result = await this.database.query(`SELECT * FROM header WHERE id = $1;`, [headerResumeId]);

			if (result.length === 0) {
				return;
			}

			return result[0] as HeaderDb;
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getHeader');
		}
	}

	async createHeader({ headerResumeId, data }: CreateHeaderInfrastructureInput): Promise<void> {
		try {
			const { name, job, location, email, phone, links, image } = data;

			if (image) {
				await this.database.query(
					`INSERT INTO header 
						(id, name, job, location, email, phone, links, image) 
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
					;`,
					[headerResumeId, name, job, location, email, phone, links, image]
				);
			} else {
				await this.database.query(
					`INSERT INTO header 
						(id, name, job, location, email, phone, links) 
						VALUES ($1, $2, $3, $4, $5, $6, $7)
					;`,
					[headerResumeId, name, job, location, email, phone, links]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createHeader');
		}
	}

	async insertHeader({ headerResumeId, resumeId }: InsertHeaderInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`UPDATE resume 
				 SET header = $1 
				 WHERE id = $2;`,
				[headerResumeId, resumeId]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'insertHeader');
		}
	}

	async updateHeader({ headerResumeId, data }: UpdateHeaderInfrastructureInput): Promise<void> {
		try {
			const { name, job, location, email, phone, links, image } = data;

			if (image) {
				await this.database.query(
					`UPDATE header
					 SET name = $2, job = $3, location = $4, email = $5, phone = $6, links = $7, image = $8
					 WHERE id = $1;`,
					[headerResumeId, name, job, location, email, phone, links, image]
				);
			} else {
				await this.database.query(
					`UPDATE header
					 SET name = $2, job = $3, location = $4, email = $5, phone = $6, links = $7
					 WHERE id = $1;`,
					[headerResumeId, name, job, location, email, phone, links]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateHeader');
		}
	}
}
