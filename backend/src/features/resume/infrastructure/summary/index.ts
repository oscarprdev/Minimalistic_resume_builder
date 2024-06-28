import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { SummaryDb } from '../../domain/types';
import {
	CreateSummaryInfrastructureInput,
	DeleteSummaryFromResumeInfrastructureInput,
	DeleteSummaryInfrastructureInput,
	ErrorActions,
	GetSummaryInfrastructureInput,
	InsertSummaryInfrastructureInput,
	UpdateSummaryInfrastructureInput,
} from './types';

export interface SummaryResumeDatabase {
	getSummary(input: GetSummaryInfrastructureInput): Promise<SummaryDb | null>;

	deleteSummary(input: DeleteSummaryInfrastructureInput): Promise<void>;
	deleteSummaryFromResume(input: DeleteSummaryFromResumeInfrastructureInput): Promise<void>;

	createSummary(input: CreateSummaryInfrastructureInput): Promise<void>;
	insertSummaryIntoResume(input: InsertSummaryInfrastructureInput): Promise<void>;
	updateSummary(input: UpdateSummaryInfrastructureInput): Promise<void>;
}

export class DefaultSummaryResumeDatabase implements SummaryResumeDatabase {
	constructor(private readonly database: Database) {}

	async getSummary({ summaryResumeId }: GetSummaryInfrastructureInput): Promise<SummaryDb | null> {
		try {
			const result = await this.database.query(
				`
				SELECT 
					*,
					summary.isHidden AS "isHidden"
				FROM summary WHERE id = $1;`,
				[summaryResumeId]
			);

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
			const { title, summary, isHidden } = data;

			await this.database.query(
				`INSERT INTO summary 
					(id, title, summary, isHidden) 
					VALUES ($1, $2, $3, $4)
				;`,
				[summaryResumeId, title, summary, isHidden ? 'true' : 'false']
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
			const { title, summary, isHidden } = data;

			console.log('updateSummary', data);

			await this.database.query(
				`UPDATE summary
					SET title = $2, 
					summary = $3, 
					isHidden = $4
				 WHERE id = $1;`,
				[summaryResumeId, title, summary, isHidden ? 'true' : 'false']
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateSummary');
		}
	}

	async deleteSummary({ summaryResumeId }: DeleteSummaryInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				DELETE FROM Summary WHERE id = $1;
				`,
				[summaryResumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteSummary');
		}
	}

	async deleteSummaryFromResume({ resumeId }: DeleteSummaryFromResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				UPDATE resume 
					SET Summary = null 
					WHERE id = $1;
				`,
				[resumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteSummaryFromResume');
		}
	}
}
