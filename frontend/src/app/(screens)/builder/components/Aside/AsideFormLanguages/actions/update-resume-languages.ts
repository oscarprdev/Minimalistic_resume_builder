'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { OptionalLanguage } from '@/store/useResumeLanguagesStore';
import { revalidatePath } from 'next/cache';

interface UpdateResumeLanguagesActionPayload {
	title: string;
	isHidden: boolean;
	languageList: OptionalLanguage[];
}

export interface UpdateResumeLanguagesAction {
	userId: string;
	resumeId: string;
	payload: UpdateResumeLanguagesActionPayload;
	postCallback: (path: string, payload: UpdateResumeLanguagesActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeLanguagesAction = async ({
	userId,
	resumeId,
	payload,
	postCallback,
}: UpdateResumeLanguagesAction): Promise<Either<string, string>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/languages`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');

	return response;
};
