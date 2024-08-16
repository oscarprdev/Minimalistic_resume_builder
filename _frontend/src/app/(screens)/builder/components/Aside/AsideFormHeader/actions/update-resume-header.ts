'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Header } from '@/types';
import { revalidatePath } from 'next/cache';

type UpdateResumeHeaderActionPayload = Omit<Header, 'id'>;

export interface UpdateResumeHeaderAction {
	userId: string;
	resumeId: string;
	payload: UpdateResumeHeaderActionPayload;
	postCallback: (path: string, payload: UpdateResumeHeaderActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeHeaderAction = async ({
	userId,
	resumeId,
	payload,
	postCallback,
}: UpdateResumeHeaderAction): Promise<Either<string, string>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/header`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');
	revalidatePath('/');

	return response;
};
