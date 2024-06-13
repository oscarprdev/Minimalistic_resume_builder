'use server';

import { API_URL } from '@/constants';
import { ERROR_NOT_LOGGED } from '@/constants/errors';
import { Either, left } from '@/lib/either';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

interface UpdateResumeSummaryActionPayload {
	title: string;
	summary: string;
}

export interface UpdateResumeSummaryAction {
	resumeId: string;
	payload: UpdateResumeSummaryActionPayload;
	postCallback: (path: string, payload: UpdateResumeSummaryActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeSummaryAction = async ({
	resumeId,
	payload,
	postCallback,
}: UpdateResumeSummaryAction): Promise<Either<string, string>> => {
	const userId = cookies().get('id')?.value;
	if (!userId) {
		return left(ERROR_NOT_LOGGED);
	}

	const path = `${API_URL}/resume/${userId}/${resumeId}/summary`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');

	return response;
};
