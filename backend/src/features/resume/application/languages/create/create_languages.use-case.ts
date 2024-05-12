import { generateUUID } from '../../../../core/application/utils/generateUuid';
import { Languages, Language } from '../../../../core/domain/types';
import { CommonResumePorts } from '../../common/common.ports';
import { DefaultCommonResumeUsecase } from '../../common/common.use_case';
import { CreateLanguagesPorts } from './create_languages.ports';

interface CreateLanguagesUsecaseExecuteInput {
	userId: string;
	resumeId: string;
	data: Languages;
}

export interface CreateLanguagesUsecase {
	execute(input: CreateLanguagesUsecaseExecuteInput): Promise<void>;
}

export class DefaultCreateLanguagesUsecase extends DefaultCommonResumeUsecase implements CreateLanguagesUsecase {
	constructor(private readonly ports: CreateLanguagesPorts, protected readonly commonPorts: CommonResumePorts) {
		super(commonPorts);
	}

	private async createNewLanguages(languagesResumeId: string, resumeId: string, data: Languages) {
		await this.ports.createLanguages({ languagesResumeId, data });
		await this.ports.insertLanguagesIntoResume({ languagesResumeId, resumeId });
	}

	private async deleteOldLanguages(languagesResumeId: string, data: Languages) {
		const currentLanguagesIds = await this.ports.getLanguages({ languagesResumeId });
		if (data.languageList.length === 0 || data.languageList.every((lang) => !lang.id)) {
			return await this.ports.deleteLanguages({ languagesIds: currentLanguagesIds });
		}

		const languagesToDelete = currentLanguagesIds.filter((currentLanguageId) =>
			data.languageList.some((lang) => 'id' in lang && lang.id !== currentLanguageId)
		);

		await this.ports.deleteLanguages({ languagesIds: languagesToDelete });
	}

	private async updateLanguagesInfo(languagesResumeId: string, data: Languages) {
		await this.deleteOldLanguages(languagesResumeId, data);

		const languagesToUpdate: Language[] = data.languageList.filter((lang) => Boolean('id' in lang));
		const newLanguages: Language[] = data.languageList.filter((lang) => !Boolean('id' in lang));
		const payloadData = {
			...data,
			languageList: languagesToUpdate,
		} satisfies Languages;

		await this.ports.updateLanguages({ languagesResumeId, data: payloadData, newLanguages });
	}

	async execute({ userId, resumeId, data }: CreateLanguagesUsecaseExecuteInput) {
		const currentUser = await this.validateUser({ userId });
		const currentResume = await this.validateResume({ resumeId, userId: currentUser.id });

		if (!currentResume) {
			await this.createResume({ resumeId, ownerId: currentUser.id });
			return await this.createNewLanguages(generateUUID(), resumeId, data);
		}

		if (!currentResume.languages) {
			return await this.createNewLanguages(generateUUID(), currentResume.id, data);
		}

		return await this.updateLanguagesInfo(currentResume.languages, data);
	}
}
