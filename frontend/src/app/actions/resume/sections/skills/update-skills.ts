'use server';

import { postAction } from '@/app/actions/shared/postAction';
import { API_URL } from '@/constants';
import { Skills } from '@/types';
import { revalidatePath } from 'next/cache';

export interface UpdateSkillsInput {
	userId: string;
	resumeId: string;
	values: Omit<Skills, 'id'>;
}

export const updateSkills = async ({ userId, resumeId, values }: UpdateSkillsInput) => {
	try {
		await postAction({
			path: `${API_URL}/resume/${userId}/${resumeId}/skills`,
			body: JSON.stringify(values),
		});

		revalidatePath('/');
	} catch (error) {
		throw new Error('Error updating skills');
	}
};
