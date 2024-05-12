import { Languages } from '../../../../core/domain/types';
import { LanguageDb } from '../../../domain/types';
import { LanguagesResumeDatabase } from '../../../infrastructure/languages';
import {
	DeleteLanguagesFromResumePortsInput,
	DeleteLanguagesPorts,
	DeleteLanguagesPortsInput,
	GetLanguagesPortsInput,
	DeleteLangsPortsInput,
} from './delete_languages.ports';

export class DeleteLanguagesAdapter implements DeleteLanguagesPorts {
	constructor(private readonly database: LanguagesResumeDatabase) {}

	private mapLanguageList(languageList: LanguageDb[]) {
		return languageList.map((lang) => ({
			id: lang.id,
			name: lang.name,
			level: lang.level,
			...(lang.certificateLink ? { certificateLink: lang.certificateLink } : {}),
		}));
	}

	async deleteLanguages({ languagesResumeId }: DeleteLanguagesPortsInput): Promise<void> {
		await this.database.deleteLanguagesSection({ languagesResumeId });
	}

	async deleteLanguagesFromResume({ resumeId }: DeleteLanguagesFromResumePortsInput): Promise<void> {
		await this.database.deleteLanguagesFromResume({ resumeId });
	}

	async deleteLangs({ langIds }: DeleteLangsPortsInput): Promise<void> {
		await this.database.deleteLanguages({ languagesIds: langIds });
	}

	async getLanguages({ languagesResumeId }: GetLanguagesPortsInput): Promise<Languages | null> {
		const languagesDb = await this.database.getLanguages({ languagesResumeId });

		if (!languagesDb) return null;

		return {
			id: languagesDb.id,
			title: languagesDb.title,
			languageList: languagesDb.languageList.every((lang) => !lang.id) ? [] : this.mapLanguageList(languagesDb.languageList),
		};
	}
}
