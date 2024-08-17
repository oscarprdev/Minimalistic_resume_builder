import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { ExperienceDb, JobDb } from '../../domain/types';
import {
	CreateExperienceInfrastructureInput,
	DeleteExperienceFromResumeInfrastructureInput,
	DeleteExperienceInfrastructureInput,
	DeleteJobsInfrastructureInput,
	ErrorActions,
	GetExperienceInfrastructureInput,
	GetJobsInfrastructureInput,
	InsertExperienceInfrastructureInput,
	UpdateExperienceInfrastructureInput,
} from './types';

export interface ExperienceResumeDatabase {
	getExperience(input: GetExperienceInfrastructureInput): Promise<ExperienceDb | null>;
	getJobs(input: GetJobsInfrastructureInput): Promise<JobDb[] | []>;

	deleteJobs(input: DeleteJobsInfrastructureInput): Promise<void>;
	deleteExperience(input: DeleteExperienceInfrastructureInput): Promise<void>;
	deleteExperienceFromResume(input: DeleteExperienceFromResumeInfrastructureInput): Promise<void>;

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
                Experience.id AS "id", 
                Experience.title AS "title",
                Experience.isHidden AS "isHidden",
                Job.id AS "jobId", 
                Job.title AS "jobTitle", 
                Job.company AS "jobCompany", 
                Job.dates AS "jobDates", 
                Job.description AS "jobDescription"
            FROM 
                Experience
            LEFT JOIN 
                ExperienceJob ON Experience.id = ExperienceJob.experienceId
            LEFT JOIN 
                Job ON ExperienceJob.jobId = Job.id
            WHERE 
                Experience.id = $1;`,
				[experienceResumeId]
			);

			const { id, title, isHidden } = result[0];

			const jobList: JobDb[] = result.map((r) => {
				return {
					id: r.jobId,
					title: r.jobTitle,
					company: r.jobCompany,
					dates: r.jobDates,
					description: r.jobDescription,
				};
			});

			const experience: ExperienceDb = {
				id,
				title,
				isHidden,
				jobList,
			};

			return experience;
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getExperience');
		}
	}

	async getJobs({ experienceResumeId }: GetJobsInfrastructureInput): Promise<[] | JobDb[]> {
		try {
			const result = await this.database.query(
				`
            SELECT 
				Job.id, 
				Job.title, 
				Job.company, 
				Job.dates, 
				Job.description
            FROM 
                Experience
            LEFT JOIN 
                ExperienceJob ON Experience.id = ExperienceJob.experienceId
            LEFT JOIN 
                Job ON ExperienceJob.jobId = Job.id
            WHERE 
                Experience.id = $1;`,
				[experienceResumeId]
			);

			if (result.length === 0) {
				return [];
			}

			return result as JobDb[];
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getJobs');
		}
	}

	async deleteExperience({ experienceResumeId }: DeleteExperienceInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				DELETE FROM experience WHERE id = $1;
				`,
				[experienceResumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteExperience');
		}
	}

	async deleteExperienceFromResume({ resumeId }: DeleteExperienceFromResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				UPDATE resume 
					SET experience = null 
					WHERE id = $1;
				`,
				[resumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteExperienceFromResume');
		}
	}

	async deleteJobs({ jobsIds }: DeleteJobsInfrastructureInput): Promise<void> {
		try {
			for (const jobId of jobsIds) {
				await this.database.query(
					`
					DELETE FROM experienceJob WHERE jobId = $1;
					`,
					[jobId]
				);

				await this.database.query(
					`
					DELETE FROM job WHERE id = $1;
					`,
					[jobId]
				);
			}
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteJobs');
		}
	}

	async createExperience({ experienceResumeId, data }: CreateExperienceInfrastructureInput): Promise<void> {
		try {
			const { title, jobList, isHidden } = data;

			await this.database.query(
				`INSERT INTO Experience 
					(id, title, isHidden) 
					VALUES ($1, $2, $3)
				;`,
				[experienceResumeId, title, isHidden ? 'true' : 'false']
			);

			for (const { title, company, dates, description } of jobList) {
				const jobId = crypto.randomUUID().toString();

				await this.database.query(
					`INSERT INTO Job 
                        (id, title, company, dates, description) 
                        VALUES ($1, $2, $3, $4, $5)
                    ;`,
					[jobId, title, company, dates, description]
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

	async updateExperience({ experienceResumeId, data, newJobs }: UpdateExperienceInfrastructureInput): Promise<void> {
		try {
			const { title, jobList, isHidden } = data;
			await this.database.query(
				`UPDATE Experience
					SET title = $2,
					isHidden = $3
                    WHERE id = $1
				;`,
				[experienceResumeId, title, isHidden ? 'true' : 'false']
			);

			for (const { id, title, company, dates, description } of jobList) {
				await this.database.query(
					`UPDATE Job
                        SET title = $2, 
                        company = $3, 
                        dates = $4, 
                        description = $5
                    WHERE id = $1
				    ;`,
					[id, title, company, dates, description]
				);
			}

			for (const { title, company, dates, description} of newJobs) {
				const jobId = crypto.randomUUID().toString();

				await this.database.query(
					`INSERT INTO Job 
                        (id, title, company, dates, description) 
                        VALUES ($1, $2, $3, $4, $5)
                    ;`,
					[jobId, title, company, dates, description]
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
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateExperience');
		}
	}
}
