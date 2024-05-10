import { LanguagesResumeDatabase } from '../../../infrastructure/languages';
import {
	CreateLanguagesPorts,
	CreateLanguagesPortsInput,
	DeleteLanguagesPortsInput,
	GetLanguagesPortsInput,
	InsertLanguagesIntoResumePortsInput,
	UpdateLanguagesPortsInput,
} from './create_languages.ports';

export class CreateLanguagesAdapter implements CreateLanguagesPorts {
	constructor(private readonly database: LanguagesResumeDatabase) {}

	async getLanguages({ languagesResumeId }: GetLanguagesPortsInput): Promise<[] | string[]> {
		const languagesDb = await this.database.getLanguage({ languagesResumeId });

		return languagesDb.map((langDb) => langDb.id);
	}

	async deleteLanguages({ languagesIds }: DeleteLanguagesPortsInput): Promise<void> {
		await this.database.deleteLanguages({ languagesIds });
	}

	async createLanguages({ languagesResumeId, data }: CreateLanguagesPortsInput): Promise<void> {
		await this.database.createLanguages({ languagesResumeId, data });
	}

	async insertLanguagesIntoResume({ languagesResumeId, resumeId }: InsertLanguagesIntoResumePortsInput): Promise<void> {
		await this.database.insertLanguagesIntoResume({ languagesResumeId, resumeId });
	}

	async updateLanguages({ languagesResumeId, data, newLanguages }: UpdateLanguagesPortsInput): Promise<void> {
		await this.database.updateLanguages({ languagesResumeId, data, newLanguages });
	}
}
