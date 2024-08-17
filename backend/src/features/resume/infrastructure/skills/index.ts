import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { SkillsDb, SkillDb } from '../../domain/types';
import {
	CreateSkillsInfrastructureInput,
	DeleteSkillsFromResumeInfrastructureInput,
	DeleteSkillsInfrastructureInput,
	DeleteSkillsSectionInfrastructureInput,
	ErrorActions,
	GetSkillInfrastructureInput,
	GetSkillsInfrastructureInput,
	InsertSkillsInfrastructureInput,
	UpdateSkillsInfrastructureInput,
} from './types';

export interface SkillsResumeDatabase {
	getSkills(input: GetSkillsInfrastructureInput): Promise<SkillsDb | null>;
	getSkill(input: GetSkillInfrastructureInput): Promise<SkillDb[] | []>;

	deleteSkills(input: DeleteSkillsInfrastructureInput): Promise<void>;
	deleteSkillsSection(input: DeleteSkillsSectionInfrastructureInput): Promise<void>;
	deleteSkillsFromResume(input: DeleteSkillsFromResumeInfrastructureInput): Promise<void>;

	createSkills(input: CreateSkillsInfrastructureInput): Promise<void>;
	insertSkillsIntoResume(input: InsertSkillsInfrastructureInput): Promise<void>;
	updateSkills(input: UpdateSkillsInfrastructureInput): Promise<void>;
}

export class DefaultSkillsResumeDatabase implements SkillsResumeDatabase {
	constructor(private readonly database: Database) {}

	async getSkills({ skillsResumeId }: GetSkillsInfrastructureInput): Promise<SkillsDb | null> {
		try {
			const result = await this.database.query(
				`
            SELECT 
                Skills.id AS "id", 
                Skills.title AS "title",
                Skills.isHidden AS "isHidden",
                Skill.id AS "SkillId", 
                Skill.name AS "SkillName"
            FROM 
                Skills
            LEFT JOIN 
                SkillsSkill ON Skills.id = SkillsSkill.SkillsId
            LEFT JOIN 
                Skill ON SkillsSkill.SkillId = Skill.id
            WHERE 
                Skills.id = $1;`,
				[skillsResumeId]
			);

			const { id, title, isHidden } = result[0];

			const skillList: SkillDb[] = result.map((r) => {
				return {
					id: r.SkillId,
					name: r.SkillName,
				};
			});

			const Skills: SkillsDb = {
				id,
				title,
				isHidden,
				skillList,
			};

			return Skills;
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getSkills');
		}
	}

	async getSkill({ skillsResumeId }: GetSkillsInfrastructureInput): Promise<[] | SkillDb[]> {
		try {
			const result = await this.database.query(
				`
            SELECT 
				Skill.id, 
				Skill.name
            FROM 
                Skills
            LEFT JOIN 
                SkillsSkill ON Skills.id = SkillsSkill.SkillsId
            LEFT JOIN 
                Skill ON SkillsSkill.SkillId = Skill.id
            WHERE 
                Skills.id = $1;`,
				[skillsResumeId]
			);

			if (result.length === 0) {
				return [];
			}

			return result as SkillDb[];
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getSkills');
		}
	}

	async deleteSkillsSection({ skillsResumeId }: DeleteSkillsSectionInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				DELETE FROM Skills WHERE id = $1;
				`,
				[skillsResumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteSkillsSection');
		}
	}

	async deleteSkillsFromResume({ resumeId }: DeleteSkillsFromResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				UPDATE resume 
					SET Skills = null 
					WHERE id = $1;
				`,
				[resumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteSkillsFromResume');
		}
	}

	async deleteSkills({ skillsIds }: DeleteSkillsInfrastructureInput): Promise<void> {
		try {
			for (const skillId of skillsIds) {
				await this.database.query(
					`
					DELETE FROM SkillsSkill WHERE SkillId = $1;
					`,
					[skillId]
				);

				await this.database.query(
					`
					DELETE FROM Skill WHERE id = $1;
					`,
					[skillId]
				);
			}
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteSkills');
		}
	}

	async createSkills({ skillsResumeId, data }: CreateSkillsInfrastructureInput): Promise<void> {
		try {
			const { title, skillList, isHidden } = data;

			await this.database.query(
				`INSERT INTO Skills 
					(id, title, isHidden) 
					VALUES ($1, $2, $3)
				;`,
				[skillsResumeId, title, isHidden ? 'true' : 'false']
			);

			for (const { name } of skillList) {
				const skillId = crypto.randomUUID().toString();

				await this.database.query(
					`INSERT INTO Skill 
                        (id, name) 
                        VALUES ($1, $2)
                    ;`,
					[skillId, name]
				);

				await this.database.query(
					`INSERT INTO SkillsSkill 
                        (SkillsId, SkillId) 
                        VALUES ($1, $2)
                    ;`,
					[skillsResumeId, skillId]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createSkills');
		}
	}

	async insertSkillsIntoResume({ skillsResumeId, resumeId }: InsertSkillsInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`UPDATE resume 
				 SET Skills = $2 
				 WHERE id = $1;`,
				[resumeId, skillsResumeId]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'insertSkills');
		}
	}

	async updateSkills({ skillsResumeId, data, newSkills }: UpdateSkillsInfrastructureInput): Promise<void> {
		try {
			const { title, skillList, isHidden } = data;
			await this.database.query(
				`UPDATE Skills
					SET title = $2,
					isHidden = $3
                    WHERE id = $1
				;`,
				[skillsResumeId, title, isHidden ? 'true' : 'false']
			);

			for (const { id, name } of skillList) {
				await this.database.query(
					`UPDATE Skill
                        SET name = $2
                    WHERE id = $1
                    ;`,
					[id, name]
				);
			}

			for (const { name } of newSkills) {
				const skillId = crypto.randomUUID().toString();

				await this.database.query(
					`INSERT INTO Skill 
                        (id, name) 
                        VALUES ($1, $2)
                    ;`,
					[skillId, name]
				);

				await this.database.query(
					`INSERT INTO SkillsSkill
                        (SkillsId, SkillId) 
                        VALUES ($1, $2)
                    ;`,
					[skillsResumeId, skillId]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateSkills');
		}
	}
}
