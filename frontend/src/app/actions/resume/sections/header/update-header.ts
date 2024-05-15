'use server';

import { API_URL } from '@/constants';
import { Header } from '@/types';
import { revalidatePath } from 'next/cache';

export interface UpdateHeaderInput {
	userId: string;
	resumeId: string;
	values: Omit<Header, 'id'>;
}

export const updateHeader = async ({ userId, resumeId, values }: UpdateHeaderInput) => {
	const response = await fetch(`${API_URL}/resume/${userId}/${resumeId}/header`, {
		method: 'POST',
		body: JSON.stringify(values),
		headers: {
			'content-type': 'application/json',
		},
	});

	revalidatePath('/');

	return response;
};
