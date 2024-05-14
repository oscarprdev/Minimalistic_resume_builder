'use server';

import { API_URL } from '@/constants';
import { Resume } from '@/types';

interface ListResumeInput {
	userId?: string | null;
}

interface ListResumeOutput {
	data: Resume[];
	error: string | null;
}

export const listResume = async ({ userId }: ListResumeInput): Promise<ListResumeOutput> => {
	try {
		if (!userId) {
			return {
				data: [],
				error: null,
			};
		}

		const response = await fetch(`${API_URL}/resume/${userId}/list`);
		const resumes = await response.json();

		return {
			data: resumes,
			error: null,
		};
	} catch (error) {
		return {
			data: [],
			error: 'Error listing resumes',
		};
	}
};
