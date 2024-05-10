import { Languages, Language } from '../../../../core/domain/types';

export interface CreateLanguagesPorts {
	getLanguages(input: GetLanguagesPortsInput): Promise<string[] | []>;
	deleteLanguages(input: DeleteLanguagesPortsInput): Promise<void>;
	createLanguages(input: CreateLanguagesPortsInput): Promise<void>;
	insertLanguagesIntoResume(input: InsertLanguagesIntoResumePortsInput): Promise<void>;
	updateLanguages(input: UpdateLanguagesPortsInput): Promise<void>;
}

export interface CreateLanguagesPortsInput {
	languagesResumeId: string;
	data: Languages;
}

export interface InsertLanguagesIntoResumePortsInput {
	languagesResumeId: string;
	resumeId: string;
}

export interface UpdateLanguagesPortsInput {
	languagesResumeId: string;
	data: Languages;
	newLanguages: Language[];
}

export interface GetLanguagesPortsInput {
	languagesResumeId: string;
}

export interface DeleteLanguagesPortsInput {
	languagesIds: string[];
}
