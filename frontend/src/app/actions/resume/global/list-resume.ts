'use server';

import { API_URL } from '@/constants';
import { DEFAULT_HEADER } from '@/data/default-header';
import { Resume } from '@/types';

interface ListResumeInput {
	userId: string;
}

interface ListResumeOutput {
	data: Resume[];
	error: string | null;
}

export const listResume = async ({ userId }: ListResumeInput): Promise<ListResumeOutput> => {
	try {
		const response = await fetch(`${API_URL}/resume/${userId}/list`);
		const resumes: Resume[] = await response.json();

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
