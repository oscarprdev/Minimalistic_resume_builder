import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { SummaryDb } from '../../domain/types';
import {
	CreateSummaryInfrastructureInput,
	ErrorActions,
	GetSummaryInfrastructureInput,
	InsertSummaryInfrastructureInput,
	UpdateSummaryInfrastructureInput,
} from './types';

export interface SummaryResumeDatabase {
	getSummary(input: GetSummaryInfrastructureInput): Promise<SummaryDb | null>;
	createSummary(input: CreateSummaryInfrastructureInput): Promise<void>;
	insertSummaryIntoResume(input: InsertSummaryInfrastructureInput): Promise<void>;
	updateSummary(input: UpdateSummaryInfrastructureInput): Promise<void>;
}

export class DefaultSummaryResumeDatabase implements SummaryResumeDatabase {
	constructor(private readonly database: Database) {}

	async getSummary({ summaryResumeId }: GetSummaryInfrastructureInput): Promise<SummaryDb | null> {
		try {
			const result = await this.database.query(`SELECT * FROM summary WHERE id = $1;`, [summaryResumeId]);

			if (result.length === 0) {
				return null;
			}

			return result[0] as SummaryDb;
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getSummary');
		}
	}

	async createSummary({ summaryResumeId, data }: CreateSummaryInfrastructureInput): Promise<void> {
		try {
			const { title, summary } = data;

			await this.database.query(
				`INSERT INTO summary 
					(id, title, summary) 
					VALUES ($1, $2, $3)
				;`,
				[summaryResumeId, title, summary]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createSummary');
		}
	}

	async insertSummaryIntoResume({ summaryResumeId, resumeId }: InsertSummaryInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`UPDATE resume 
				 SET summary = $1 
				 WHERE id = $2;`,
				[summaryResumeId, resumeId]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'insertSummary');
		}
	}

	async updateSummary({ summaryResumeId, data }: UpdateSummaryInfrastructureInput): Promise<void> {
		try {
			const { title, summary } = data;

			await this.database.query(
				`UPDATE summary
				 SET title = $2, summary = $3
				 WHERE id = $1;`,
				[summaryResumeId, title, summary]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateSummary');
		}
	}
}
