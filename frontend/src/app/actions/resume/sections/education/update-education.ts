'use server';

import { postAction } from '@/app/actions/shared/postAction';
import { API_URL } from '@/constants';
import { Education } from '@/types';
import { revalidatePath } from 'next/cache';

export interface UpdateEducationInput {
	userId: string;
	resumeId: string;
	values: Omit<Education, 'id'>;
}

export const updateEducation = async ({ userId, resumeId, values }: UpdateEducationInput) => {
	try {
		await postAction({
			path: `${API_URL}/resume/${userId}/${resumeId}/education`,
			body: JSON.stringify(values),
		});

		revalidatePath('/');
	} catch (error) {
		throw new Error('Error updating education');
	}
};
