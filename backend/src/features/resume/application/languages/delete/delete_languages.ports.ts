import { Languages } from '../../../../core/domain/types';

export interface DeleteLanguagesPorts {
	deleteLanguages(input: DeleteLanguagesPortsInput): Promise<void>;
	deleteLanguagesFromResume(input: DeleteLanguagesFromResumePortsInput): Promise<void>;
	deleteLangs(input: DeleteLangsPortsInput): Promise<void>;
	getLanguages(input: GetLanguagesPortsInput): Promise<Languages | null>;
}

export interface GetLanguagesPortsInput {
	languagesResumeId: string;
}

export interface DeleteLanguagesPortsInput {
	languagesResumeId: string;
}

export interface DeleteLangsPortsInput {
	langIds: string[];
}

export interface DeleteLanguagesFromResumePortsInput {
	resumeId: string;
}
