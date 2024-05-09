import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { ExperienceDb } from '../../domain/types';
import {
	CreateExperienceInfrastructureInput,
	ErrorActions,
	GetExperienceInfrastructureInput,
	InsertExperienceInfrastructureInput,
	UpdateExperienceInfrastructureInput,
} from './types';

export interface ExperienceResumeDatabase {
	getExperience(input: GetExperienceInfrastructureInput): Promise<ExperienceDb | null>;
	createExperience(input: CreateExperienceInfrastructureInput): Promise<void>;
	insertExperienceIntoResume(input: InsertExperienceInfrastructureInput): Promise<void>;
	updateExperience(input: UpdateExperienceInfrastructureInput): Promise<void>;
}

export class DefaultExperienceResumeDatabase implements ExperienceResumeDatabase {
	constructor(private readonly database: Database) {}

	async getExperience({ experienceResumeId }: GetExperienceInfrastructureInput): Promise<ExperienceDb | null> {
		try {
			const result = await this.database.query(
				`
            SELECT 
                Experience.id AS "experienceId", 
                Experience.title AS "experienceTitle",
                Job.id AS "jobId", 
                Job.title AS "jobTitle", 
                Job.company AS "jobCompany", 
                Job.startDate AS "jobStartDate", 
                Job.endDate AS "jobEndDate", 
                Job.description AS "jobDescription"
            FROM 
                Experience
            LEFT JOIN 
                ExperienceJob ON Experience.id = ExperienceJob.experienceId
            LEFT JOIN 
                Job ON ExperienceJob.jobId = Job.id
            WHERE 
                Experience.id = '$1';`,
				[experienceResumeId]
			);

			if (result.length === 0) {
				return null;
			}

			return result[0] as ExperienceDb;
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getExperience');
		}
	}

	async createExperience({ experienceResumeId, data }: CreateExperienceInfrastructureInput): Promise<void> {
		try {
			const { title, jobList } = data;

			await this.database.query(
				`INSERT INTO Experience 
					(id, title) 
					VALUES ($1, $2)
				;`,
				[experienceResumeId, title]
			);

			for (const { title, company, startDate, endDate, description } of jobList) {
				const jobId = crypto.randomUUID().toString();

				await this.database.query(
					`INSERT INTO Job 
                        (id, title, company, startDate, endDate, description) 
                        VALUES ($1, $2, $3, $4, $5, $6)
                    ;`,
					[jobId, title, company, startDate, endDate, description]
				);

				await this.database.query(
					`INSERT INTO ExperienceJob 
                        (experienceId, jobId) 
                        VALUES ($1, $2)
                    ;`,
					[experienceResumeId, jobId]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createExperience');
		}
	}

	async insertExperienceIntoResume({ experienceResumeId, resumeId }: InsertExperienceInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`UPDATE resume 
				 SET experience = $2 
				 WHERE id = $1;`,
				[resumeId, experienceResumeId]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'insertExperience');
		}
	}

	async updateExperience({ experienceResumeId, data }: UpdateExperienceInfrastructureInput): Promise<void> {
		try {
			const { title, jobList } = data;
			await this.database.query(
				`UPDATE Experience
					title = $2
                    WHERE id = $1
				;`,
				[experienceResumeId, title]
			);

			for (const { id, title, company, startDate, endDate, description } of jobList) {
				await this.database.query(
					`UPDATE Job
                        title = $2, 
                        company = $3, 
                        startDate = $4, 
                        endDate = $5, 
                        description = $6 
                    WHERE id = $1
				    ;`,
					[id, title, company, startDate, endDate, description]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateExperience');
		}
	}
}
