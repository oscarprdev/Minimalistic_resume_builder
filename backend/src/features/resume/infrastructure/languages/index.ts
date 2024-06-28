import { DefaultErrorEntity } from '../../../core/domain/entities/Error';
import { Database } from '../../../core/infrastructure/database';
import { LanguagesDb, LanguageDb } from '../../domain/types';
import {
	CreateLanguagesInfrastructureInput,
	DeleteLanguagesFromResumeInfrastructureInput,
	DeleteLanguagesInfrastructureInput,
	DeleteLanguagesSectionInfrastructureInput,
	ErrorActions,
	GetLanguageInfrastructureInput,
	GetLanguagesInfrastructureInput,
	InsertLanguagesInfrastructureInput,
	UpdateLanguagesInfrastructureInput,
} from './types';

export interface LanguagesResumeDatabase {
	getLanguages(input: GetLanguagesInfrastructureInput): Promise<LanguagesDb | null>;
	getLanguage(input: GetLanguageInfrastructureInput): Promise<LanguageDb[] | []>;

	deleteLanguages(input: DeleteLanguagesInfrastructureInput): Promise<void>;
	deleteLanguagesSection(input: DeleteLanguagesSectionInfrastructureInput): Promise<void>;
	deleteLanguagesFromResume(input: DeleteLanguagesFromResumeInfrastructureInput): Promise<void>;

	createLanguages(input: CreateLanguagesInfrastructureInput): Promise<void>;
	insertLanguagesIntoResume(input: InsertLanguagesInfrastructureInput): Promise<void>;
	updateLanguages(input: UpdateLanguagesInfrastructureInput): Promise<void>;
}

export class DefaultLanguagesResumeDatabase implements LanguagesResumeDatabase {
	constructor(private readonly database: Database) {}

	async getLanguages({ languagesResumeId }: GetLanguagesInfrastructureInput): Promise<LanguagesDb | null> {
		try {
			const result = await this.database.query(
				`
            SELECT 
                Languages.id AS "id", 
                Languages.title AS "title",
                Languages.isHidden AS "isHidden",
                Language.id AS "LanguageId", 
                Language.name AS "LanguageName", 
                Language.level AS "LanguageLevel", 
                Language.certificateLink AS "LanguageCertificateLink"
            FROM 
                Languages
            LEFT JOIN 
                LanguagesLang ON Languages.id = LanguagesLang.LanguagesId
            LEFT JOIN 
                Language ON LanguagesLang.LanguageId = Language.id
            WHERE 
                Languages.id = $1;`,
				[languagesResumeId]
			);

			const { id, title, isHidden } = result[0];

			const languageList: LanguageDb[] = result.map((r) => {
				return {
					id: r.LanguageId,
					name: r.LanguageName,
					level: r.LanguageLevel,
					certificateLink: r.LanguageCertificateLink,
				};
			});

			const Languages: LanguagesDb = {
				id,
				title,
				isHidden,
				languageList,
			};

			return Languages;
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getLanguages');
		}
	}

	async getLanguage({ languagesResumeId }: GetLanguagesInfrastructureInput): Promise<[] | LanguageDb[]> {
		try {
			const result = await this.database.query(
				`
            SELECT 
				Language.id, 
				Language.name, 
				Language.level, 
				Language.certificateLink
            FROM 
                Languages
            LEFT JOIN 
                LanguagesLang ON Languages.id = LanguagesLang.LanguagesId
            LEFT JOIN 
                Language ON LanguagesLang.LanguageId = Language.id
            WHERE 
                Languages.id = $1;`,
				[languagesResumeId]
			);

			if (result.length === 0) {
				return [];
			}

			return result as LanguageDb[];
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'getLanguages');
		}
	}

	async deleteLanguagesSection({ languagesResumeId }: DeleteLanguagesSectionInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				DELETE FROM languages WHERE id = $1;
				`,
				[languagesResumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteLanguagesSection');
		}
	}

	async deleteLanguagesFromResume({ resumeId }: DeleteLanguagesFromResumeInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`
				UPDATE resume 
					SET languages = null 
					WHERE id = $1;
				`,
				[resumeId]
			);
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteLanguagesFromResume');
		}
	}

	async deleteLanguages({ languagesIds }: DeleteLanguagesInfrastructureInput): Promise<void> {
		try {
			for (const languageId of languagesIds) {
				await this.database.query(
					`
					DELETE FROM LanguagesLang WHERE LanguageId = $1;
					`,
					[languageId]
				);

				await this.database.query(
					`
					DELETE FROM Language WHERE id = $1;
					`,
					[languageId]
				);
			}
		} catch (error: unknown) {
			return new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'deleteLanguages');
		}
	}

	async createLanguages({ languagesResumeId, data }: CreateLanguagesInfrastructureInput): Promise<void> {
		try {
			const { title, languageList, isHidden } = data;

			await this.database.query(
				`INSERT INTO Languages 
					(id, title, isHidden) 
					VALUES ($1, $2, $3)
				;`,
				[languagesResumeId, title, isHidden ? 'true' : 'false']
			);

			for (const { name, level, certificateLink } of languageList) {
				const languageId = crypto.randomUUID().toString();

				if (certificateLink || certificateLink === '') {
					await this.database.query(
						`INSERT INTO Language 
                            (id, name, level, certificateLink) 
                            VALUES ($1, $2, $3, $4)
                        ;`,
						[languageId, name, level, certificateLink]
					);
				} else {
					await this.database.query(
						`INSERT INTO Language 
                        (id, name, level) 
                        VALUES ($1, $2, $3)
                    ;`,
						[languageId, name, level]
					);
				}

				await this.database.query(
					`INSERT INTO LanguagesLang 
                        (LanguagesId, LanguageId) 
                        VALUES ($1, $2)
                    ;`,
					[languagesResumeId, languageId]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'createLanguages');
		}
	}

	async insertLanguagesIntoResume({ languagesResumeId, resumeId }: InsertLanguagesInfrastructureInput): Promise<void> {
		try {
			await this.database.query(
				`UPDATE resume 
				 SET Languages = $2 
				 WHERE id = $1;`,
				[resumeId, languagesResumeId]
			);
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'insertLanguages');
		}
	}

	async updateLanguages({ languagesResumeId, data, newLanguages }: UpdateLanguagesInfrastructureInput): Promise<void> {
		try {
			const { title, languageList, isHidden } = data;
			await this.database.query(
				`UPDATE Languages
					SET title = $2,
					isHidden = $3
                    WHERE id = $1
				;`,
				[languagesResumeId, title, isHidden ? 'true' : 'false']
			);

			for (const { id, name, level, certificateLink } of languageList) {
				if (certificateLink || certificateLink === '') {
					await this.database.query(
						`UPDATE Language
                            SET name = $2, 
                            level = $3, 
                            certificateLink = $4
                        WHERE id = $1
                        ;`,
						[id, name, level, certificateLink]
					);
				} else {
					await this.database.query(
						`UPDATE Language
                            SET name = $2, 
                            level = $3
                        WHERE id = $1
                        ;`,
						[id, name, level]
					);
				}
			}

			for (const { name, level, certificateLink } of newLanguages) {
				const languageId = crypto.randomUUID().toString();

				if (certificateLink || certificateLink === '') {
					await this.database.query(
						`INSERT INTO Language 
                            (id, name, level, certificateLink) 
                            VALUES ($1, $2, $3, $4)
                        ;`,
						[languageId, name, level, certificateLink]
					);
				} else {
					await this.database.query(
						`INSERT INTO Language 
                        (id, name, level) 
                        VALUES ($1, $2, $3)
                    ;`,
						[languageId, name, level]
					);
				}

				await this.database.query(
					`INSERT INTO LanguagesLang
                        (LanguagesId, LanguageId) 
                        VALUES ($1, $2)
                    ;`,
					[languagesResumeId, languageId]
				);
			}
		} catch (error: unknown) {
			new DefaultErrorEntity().sendError<ErrorActions>(error, 500, 'updateLanguages');
		}
	}
}
