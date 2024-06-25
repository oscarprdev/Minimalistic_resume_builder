'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { OptionalSkill } from '@/store/useResumeSkillsStore';
import { revalidatePath } from 'next/cache';

interface UpdateResumeSkillsActionPayload {
	title: string;
	skillList: OptionalSkill[];
}

export interface UpdateResumeSkillsAction {
	userId: string;
	resumeId: string;
	payload: UpdateResumeSkillsActionPayload;
	postCallback: (path: string, payload: UpdateResumeSkillsActionPayload) => Promise<Either<string, string>>;
}

export const updateResumeSkillsAction = async ({
	userId,
	resumeId,
	payload,
	postCallback,
}: UpdateResumeSkillsAction): Promise<Either<string, string>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/skills`;

	const response = await postCallback(path, payload);

	revalidatePath('/builder');

	return response;
};
