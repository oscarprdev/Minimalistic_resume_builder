import { Languages, Language } from '../../../core/domain/types';

export type ErrorActions = 'getLanguages' | 'getLanguages' | 'deleteLanguages' | 'createLanguages' | 'insertLanguages' | 'updateLanguages';

export interface CreateLanguagesInfrastructureInput {
	languagesResumeId: string;
	data: Languages;
}

export interface InsertLanguagesInfrastructureInput {
	languagesResumeId: string;
	resumeId: string;
}

export interface GetLanguagesInfrastructureInput {
	languagesResumeId: string;
}

export interface GetLanguageInfrastructureInput {
	languagesResumeId: string;
}

export interface UpdateLanguagesInfrastructureInput {
	languagesResumeId: string;
	data: Languages;
	newLanguages: Language[];
}

export interface DeleteLanguagesInfrastructureInput {
	languagesIds: string[];
}
