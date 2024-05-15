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
	try {
		console.log(values);
		const response = await fetch(`${API_URL}/resume/${userId}/${resumeId}/header`, {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'content-type': 'application/json',
			},
		});

		revalidatePath('/');

		// const data = await response.json();

		console.log(response);
		return response;
	} catch (error) {
		console.log(error);
	}
};
