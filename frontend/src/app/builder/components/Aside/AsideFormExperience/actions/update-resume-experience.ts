'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { OptionalJob } from '@/store/useResumeExperienceStore';
import { revalidatePath } from 'next/cache';

interface UpdateResumeExperienceActionPayload {
	title: string;
	jobList: OptionalJob[];
}

export interface UpdateResumeExperienceAction {
	userId: string;
	resumeId: string;
	payload: UpdateResumeExperienceActionPayload;
	postCallback: (path: string, payload: UpdateResumeExperienceActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeExperienceAction = async ({
	userId,
	resumeId,
	payload,
	postCallback,
}: UpdateResumeExperienceAction): Promise<Either<string, string>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/experience`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');

	return response;
};
