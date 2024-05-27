'use server';

import { API_URL } from '@/constants';
import { DEFAULT_SUMMARY } from '@/data/default-summary';

import { Summary } from '@/types';

export interface DescribeSummaryInput {
	userId?: string;
	resumeId?: string;
}

export interface DescribeSummaryOutput {
	data: Summary;
	error: string | null;
}

export const describeSummary = async ({ resumeId, userId }: DescribeSummaryInput): Promise<DescribeSummaryOutput> => {
	try {
		if (!resumeId || !userId) {
			return {
				data: DEFAULT_SUMMARY,
				error: null,
			};
		}

		const response = await fetch(`${API_URL}/resume/${userId}/${resumeId}/summary`, { cache: 'no-store' });
		const data: Summary = await response.json();

		return {
			data,
			error: null,
		};
	} catch (error) {
		return {
			data: DEFAULT_SUMMARY,
			error: 'Error describing resume summary section',
		};
	}
};
