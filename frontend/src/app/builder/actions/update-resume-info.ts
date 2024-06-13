'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { revalidatePath } from 'next/cache';

interface UpdateResumeInfoActionPayload {
	title: string;
}

export interface UpdateResumeInfoAction {
	resumeId: string;
	userId: string;
	payload: UpdateResumeInfoActionPayload;
	postCallback: (path: string, payload: UpdateResumeInfoActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeInfoAction = async ({
	resumeId,
	userId,
	payload,
	postCallback,
}: UpdateResumeInfoAction): Promise<Either<string, string>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/update`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');

	return response;
};
