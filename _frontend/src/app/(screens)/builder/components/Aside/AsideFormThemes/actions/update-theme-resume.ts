'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Resume } from '@/types';
import { revalidatePath } from 'next/cache';

interface UpdateResumeThemeActionPayload {
	theme: Resume.theme;
}

export interface UpdateResumeThemeAction {
	resumeId: string;
	userId: string;
	payload: UpdateResumeThemeActionPayload;
	postCallback: (path: string, payload: UpdateResumeThemeActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeThemeAction = async ({
	resumeId,
	userId,
	payload,
	postCallback,
}: UpdateResumeThemeAction): Promise<Either<string, string>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/update`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');
	revalidatePath('/');

	return response;
};
