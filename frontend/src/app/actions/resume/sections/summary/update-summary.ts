'use server';

import { postAction } from '@/app/actions/shared/postAction';
import { API_URL } from '@/constants';
import { Summary } from '@/types';
import { revalidatePath } from 'next/cache';

export interface UpdateSummaryInput {
	userId: string;
	resumeId: string;
	values: Omit<Summary, 'id'>;
}

export const updateSummary = async ({ userId, resumeId, values }: UpdateSummaryInput) => {
	try {
		await postAction({
			path: `${API_URL}/resume/${userId}/${resumeId}/summary`,
			body: JSON.stringify(values),
		});

		revalidatePath('/');
	} catch (error) {
		throw new Error('Error updating summary');
	}
};
