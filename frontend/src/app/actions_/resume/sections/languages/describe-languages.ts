'use server';

import { API_URL } from '@/constants';
import { DEFAULT_LANGUAGES } from '@/data/default-laguages';
import { Languages } from '@/types';

export interface DescribeLanguagesInput {
	userId?: string;
	resumeId?: string;
}

export interface DescribeLanguagesOutput {
	data: Languages;
	error: string | null;
}

export const describeLanguages = async ({ resumeId, userId }: DescribeLanguagesInput): Promise<DescribeLanguagesOutput> => {
	try {
		if (!resumeId || !userId) {
			return {
				data: DEFAULT_LANGUAGES,
				error: null,
			};
		}

		const response = await fetch(`${API_URL}/resume/${userId}/${resumeId}/languages`, { cache: 'no-store' });

		if (response.status === 404) {
			return {
				data: DEFAULT_LANGUAGES,
				error: null,
			};
		}

		const data: Languages = await response.json();

		if (data.languageList.length === 0) {
			return {
				data: { ...data, languageList: DEFAULT_LANGUAGES.languageList },
				error: null,
			};
		}

		return {
			data,
			error: null,
		};
	} catch (error) {
		return {
			data: DEFAULT_LANGUAGES,
			error: 'Error describing resume languages section',
		};
	}
};
