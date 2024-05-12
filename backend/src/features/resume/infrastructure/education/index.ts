import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { EducationDb, SchoolDb } from '../../domain/types';
import {
	CreateEducationInfrastructureInput,
	DeleteEducationInfrastructureInput,
	DeleteSchoolsInfrastructureInput,
	ErrorActions,
	GetEducationInfrastructureInput,
	GetSchoolsInfrastructureInput,
	InsertEducationInfrastructureInput,
	UpdateEducationInfrastructureInput,
	DeleteEducationFromResumeInfrastructureInput,
} from './types';

export interface EducationResumeDatabase {
	getEducation(input: GetEducationInfrastructureInput): Promise<EducationDb | null>;
	getSchools(input: GetSchoolsInfrastructureInput): Promise<SchoolDb[] | []>;

	deleteSchools(input: DeleteSchoolsInfrastructureInput): Promise<void>;
	deleteEducation(input: DeleteEducationInfrastructureInput): Promise<void>;
	deleteEducationFromResume(input: DeleteEducationFromResumeInfrastructureInput): Promise<void>;

	createEducation(input: CreateEducationInfrastructureInput): Promise<void>;
	insertEducationIntoResume(input: InsertEducationInfrastructureInput): Promise<void>;
	updateEducation(input: UpdateEducationInfrastructureInput): Promise<void>;
}

export class DefaultEducationResumeDatabase implements EducationResumeDatabase {
	constructor(private readonly database: Database) {}

	async getEducation({ educationResumeId }: GetEducationInfrastructureInput): Promise<EducationDb | null> {
		try {
			const result = await this.database.query(
				`
            SELECT 
                Education.id AS "id", 
                Education.title AS "title",
                School.id AS "schoolId", 
                School.title AS "schoolTitle", 
                School.career AS "schoolCareer", 
                School.startDate AS "schoolStartDate", 
                School.endDate AS "schoolEndDate", 
                School.description AS "schoolDescription"
            FROM 
                Education
            LEFT JOIN 
                EducationSchool ON Education.id = EducationSchool.EducationId
            LEFT JOIN 
                School ON EducationSchool.schoolId = School.id
            WHERE 
                Education.id = $1;`,
				[educationResumeId]
			);

			if (!result[0].id) {
				return null;
			}

			const { id, title } = result[0];

			const educationList: SchoolDb[] = result.map((r) => {
				return {
					id: r.schoolId,
					title: r.schoolTitle,
					career: r.schoolCareer,
					startDate: r.SchoolstartDate,
					endDate: r.schoolEndDate,
					description: r.schoolDescription,
				};
			});

			const Education: EducationDb = {
				id,
				title,
				educationList,
			};

			return Education;
		} catch (error: unknown) {
			console.log(error);
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getEducation');
		}
	}

	async getSchools({ educationResumeId }: GetSchoolsInfrastructureInput): Promise<[] | SchoolDb[]> {
		try {
			const result = await this.database.query(
				`
            SELECT 
				School.id, 
				School.title, 
				School.career, 
				School.startDate, 
				School.endDate, 
				School.description
            FROM 
                Education
            LEFT JOIN 
                EducationSchool ON Education.id = EducationSchool.EducationId
            LEFT JOIN 
                School ON EducationSchool.schoolId = School.id
            WHERE 
                Education.id = $1;`,
				[educationResumeId]
			);

			if (result.length === 0) {
				return [];
			}

			return result as SchoolDb[];
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getSchools');
		}
	}

	async deleteEducation({ educationResumeId }: DeleteEducationInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				DELETE FROM education WHERE id = $1;
				`,
				[educationResumeId]
			);

			await this.database.query(
				`
				UPDATE resume 
					SET education = null 
					WHERE id = $1;
				`,
				[educationResumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteEducation');
		}
	}

	async deleteEducationFromResume({ resumeId }: DeleteEducationFromResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				UPDATE resume 
					SET education = null 
					WHERE id = $1;
				`,
				[resumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteEducationFromResume');
		}
	}

	async deleteSchools({ schoolsIds }: DeleteSchoolsInfrastructureInput): Promise<void> {
		try {
			for (const schoolId of schoolsIds) {
				await this.database.query(
					`
					DELETE FROM educationSchool WHERE schoolId = $1;
					`,
					[schoolId]
				);

				await this.database.query(
					`
					DELETE FROM school WHERE id = $1;
					`,
					[schoolId]
				);
			}
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteSchools');
		}
	}

	async createEducation({ educationResumeId, data }: CreateEducationInfrastructureInput): Promise<void> {
		try {
			const { title, educationList } = data;

			await this.database.query(
				`INSERT INTO Education 
					(id, title) 
					VALUES ($1, $2)
				;`,
				[educationResumeId, title]
			);

			for (const { title, career, startDate, endDate, description } of educationList) {
				const schoolId = crypto.randomUUID().toString();

				await this.database.query(
					`INSERT INTO School 
                        (id, title, career, startDate, endDate, description) 
                        VALUES ($1, $2, $3, $4, $5, $6)
                    ;`,
					[schoolId, title, career, startDate, endDate, description]
				);

				await this.database.query(
					`INSERT INTO EducationSchool 
                        (EducationId, schoolId) 
                        VALUES ($1, $2)
                    ;`,
					[educationResumeId, schoolId]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createEducation');
		}
	}

	async insertEducationIntoResume({ educationResumeId, resumeId }: InsertEducationInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`UPDATE resume 
				 SET Education = $2 
				 WHERE id = $1;`,
				[resumeId, educationResumeId]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'insertEducation');
		}
	}

	async updateEducation({ educationResumeId, data, newSchools }: UpdateEducationInfrastructureInput): Promise<void> {
		try {
			const { title, educationList } = data;
			await this.database.query(
				`UPDATE Education
					SET title = $2
                    WHERE id = $1
				;`,
				[educationResumeId, title]
			);

			for (const { id, title, career, startDate, endDate, description } of educationList) {
				await this.database.query(
					`UPDATE School
                        SET title = $2, 
                        career = $3, 
                        startDate = $4, 
                        endDate = $5, 
                        description = $6 
                    WHERE id = $1
				    ;`,
					[id, title, career, startDate, endDate, description]
				);
			}

			for (const { title, career, startDate, endDate, description } of newSchools) {
				const schoolId = crypto.randomUUID().toString();

				await this.database.query(
					`INSERT INTO School 
                        (id, title, career, startDate, endDate, description) 
                        VALUES ($1, $2, $3, $4, $5, $6)
                    ;`,
					[schoolId, title, career, startDate, endDate, description]
				);

				await this.database.query(
					`INSERT INTO EducationSchool 
                        (EducationId, schoolId) 
                        VALUES ($1, $2)
                    ;`,
					[educationResumeId, schoolId]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateEducation');
		}
	}
}
