import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { HeaderDb } from '../../domain/types';
import {
	CreateHeaderInfrastructureInput,
	DeleteHeaderFromResumeInfrastructureInput,
	DeleteHeaderInfrastructureInput,
	ErrorActions,
	GetHeaderInfrastructureInput,
	InsertHeaderInfrastructureInput,
	UpdateHeaderInfrastructureInput,
} from './types';

export interface HeaderResumeDatabase {
	getHeader(input: GetHeaderInfrastructureInput): Promise<HeaderDb | null>;

	deleteHeader(input: DeleteHeaderInfrastructureInput): Promise<void>;
	deleteHeaderFromResume(input: DeleteHeaderFromResumeInfrastructureInput): Promise<void>;

	createHeader(input: CreateHeaderInfrastructureInput): Promise<void>;
	insertHeaderIntoResume(input: InsertHeaderInfrastructureInput): Promise<void>;
	updateHeader(input: UpdateHeaderInfrastructureInput): Promise<void>;
}

export class DefaultHeaderResumeDatabase implements HeaderResumeDatabase {
	constructor(private readonly database: Database) {}

	async getHeader({ headerResumeId }: GetHeaderInfrastructureInput): Promise<HeaderDb | null> {
		try {
			const result = await this.database.query(
				`
				SELECT 		
					*,
					header.isHidden AS "isHidden"
				FROM header WHERE id = $1;`,
				[headerResumeId]
			);

			if (result.length === 0) {
				return null;
			}

			return result[0] as HeaderDb;
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getHeader');
		}
	}

	async createHeader({ headerResumeId, data }: CreateHeaderInfrastructureInput): Promise<void> {
		try {
			const { name, job, location, email, phone, links, image, isHidden } = data;

			if (image) {
				await this.database.query(
					`INSERT INTO header 
						(id, name, job, location, email, phone, links, image, isHidden) 
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
					;`,
					[headerResumeId, name, job, location, email, phone, links, image, isHidden ? 'true' : 'false']
				);
			} else {
				await this.database.query(
					`INSERT INTO header 
						(id, name, job, location, email, phone, links, isHidden) 
						VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
					;`,
					[headerResumeId, name, job, location, email, phone, links, isHidden ? 'true' : 'false']
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createHeader');
		}
	}

	async insertHeaderIntoResume({ headerResumeId, resumeId }: InsertHeaderInfrastructureInput): Promise<void> {
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
			const { name, job, location, email, phone, links, image, isHidden } = data;

			if (image) {
				await this.database.query(
					`UPDATE header
					 	SET name = $2, 
						job = $3, 
						location = $4, 
						email = $5, 
						phone = $6, 
						links = $7, 
						image = $8,
						isHidden = $9
					 WHERE id = $1;`,
					[headerResumeId, name, job, location, email, phone, links, image, isHidden ? 'true' : 'false']
				);
			} else {
				await this.database.query(
					`UPDATE header
					 	SET name = $2, 
						job = $3, 
						location = $4, 
						email = $5, 
						phone = $6, 
						links = $7,
						isHidden = $8
					 WHERE id = $1;`,
					[headerResumeId, name, job, location, email, phone, links, isHidden ? 'true' : 'false']
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateHeader');
		}
	}

	async deleteHeader({ headerResumeId }: DeleteHeaderInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				DELETE FROM Header WHERE id = $1;
				`,
				[headerResumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteHeader');
		}
	}

	async deleteHeaderFromResume({ resumeId }: DeleteHeaderFromResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				UPDATE resume 
					SET Header = null 
					WHERE id = $1;
				`,
				[resumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteHeaderFromResume');
		}
	}
}
