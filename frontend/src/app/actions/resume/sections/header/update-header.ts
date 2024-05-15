'use server';

import { postAction } from '@/app/actions/shared/postAction';
import { API_URL } from '@/constants';
import { Header } from '@/types';
import { revalidatePath } from 'next/cache';

export interface UpdateHeaderInput {
	userId: string;
	resumeId: string;
	values: Omit<Header, 'id'>;
}

export const updateHeader = async ({ userId, resumeId, values }: UpdateHeaderInput) => {
	await postAction({
		path: `${API_URL}/resume/${userId}/${resumeId}/header`,
		body: JSON.stringify(values),
	});

	revalidatePath('/');
};
