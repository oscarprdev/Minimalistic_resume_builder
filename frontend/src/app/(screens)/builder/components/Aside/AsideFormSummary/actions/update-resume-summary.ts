'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { revalidatePath } from 'next/cache';

interface UpdateResumeSummaryActionPayload {
	title: string;
	summary: string;
	isHidden: boolean;
}

export interface UpdateResumeSummaryAction {
	userId: string;
	resumeId: string;
	payload: UpdateResumeSummaryActionPayload;
	postCallback: (path: string, payload: UpdateResumeSummaryActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeSummaryAction = async ({
	userId,
	resumeId,
	payload,
	postCallback,
}: UpdateResumeSummaryAction): Promise<Either<string, string>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/summary`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');
	revalidatePath('/');

	return response;
};
