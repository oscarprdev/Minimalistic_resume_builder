'use server';

import { postAction } from '@/app/actions/shared/postAction';
import { API_URL } from '@/constants';
import { Languages } from '@/types';
import { revalidatePath } from 'next/cache';

export interface UpdateLanguagesInput {
	userId: string;
	resumeId: string;
	values: Omit<Languages, 'id'>;
}

export const updateLanguages = async ({ userId, resumeId, values }: UpdateLanguagesInput) => {
	try {
		await postAction({
			path: `${API_URL}/resume/${userId}/${resumeId}/languages`,
			body: JSON.stringify(values),
		});

		revalidatePath('/');
	} catch (error) {
		throw new Error('Error updating languages');
	}
};
