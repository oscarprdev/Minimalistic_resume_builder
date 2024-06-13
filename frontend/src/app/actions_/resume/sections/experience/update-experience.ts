'use server';

import { postAction } from '@/app/actions/shared/postAction';
import { API_URL } from '@/constants';
import { Experience } from '@/types';
import { revalidatePath } from 'next/cache';

export interface UpdateExperienceInput {
	userId: string;
	resumeId: string;
	values: Omit<Experience, 'id'>;
}

export const updateExperience = async ({ userId, resumeId, values }: UpdateExperienceInput) => {
	try {
		await postAction({
			path: `${API_URL}/resume/${userId}/${resumeId}/experience`,
			body: JSON.stringify(values),
		});

		revalidatePath('/');
	} catch (error) {
		throw new Error('Error updating experience');
	}
};
