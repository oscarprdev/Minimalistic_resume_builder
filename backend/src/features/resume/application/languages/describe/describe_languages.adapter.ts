import { Languages } from '../../../../core/domain/types';
import { LanguageDb } from '../../../domain/types';
import { LanguagesResumeDatabase } from '../../../infrastructure/languages';
import { DescribeLanguagesPorts, GetLanguagesPortsInput } from './describe_languages.ports';

export class DescribeLanguagesAdapter implements DescribeLanguagesPorts {
	constructor(private readonly database: LanguagesResumeDatabase) {}

	private mapLanguageList(languageList: LanguageDb[]) {
		return languageList.map((lang) => ({
			id: lang.id,
			name: lang.name,
			level: lang.level,
			...(lang.certificateLink ? { certificateLink: lang.certificateLink } : {}),
		}));
	}

	async getLanguages({ languagesResumeId }: GetLanguagesPortsInput): Promise<Languages | null> {
		const languagesDb = await this.database.getLanguages({ languagesResumeId });

		if (!languagesDb) return null;

		return {
			id: languagesDb.id,
			title: languagesDb.title,
			isHidden: languagesDb.isHidden,
			languageList: languagesDb.languageList.every((lang) => !lang.id) ? [] : this.mapLanguageList(languagesDb.languageList),
		};
	}
}
