import { Languages } from '../../../../core/domain/types';

export interface DescribeLanguagesPorts {
	getLanguages(input: GetLanguagesPortsInput): Promise<Languages | null>;
}

export interface GetLanguagesPortsInput {
	languagesResumeId: string;
}
