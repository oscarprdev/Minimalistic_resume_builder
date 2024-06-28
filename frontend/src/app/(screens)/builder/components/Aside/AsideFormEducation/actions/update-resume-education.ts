'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { OptionalSchool } from '@/store/useResumeEducationStore';
import { revalidatePath } from 'next/cache';

interface UpdateResumeEducationActionPayload {
	title: string;
	isHidden: boolean;
	educationList: OptionalSchool[];
}

export interface UpdateResumeEducationAction {
	userId: string;
	resumeId: string;
	payload: UpdateResumeEducationActionPayload;
	postCallback: (path: string, payload: UpdateResumeEducationActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeEducationAction = async ({
	userId,
	resumeId,
	payload,
	postCallback,
}: UpdateResumeEducationAction): Promise<Either<string, string>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/education`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');

	return response;
};
