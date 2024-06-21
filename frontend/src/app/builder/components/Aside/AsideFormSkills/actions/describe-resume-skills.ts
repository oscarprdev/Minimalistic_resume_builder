'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Skills } from '@/types';

export interface DescribeResumeSkillsActionInput {
	userId: string;
	resumeId: string | null;
	getCallback: (path: string) => Promise<Either<string, Skills>>;
}

export const describeResumeSkillsAction = async ({
	userId,
	resumeId,
	getCallback,
}: DescribeResumeSkillsActionInput): Promise<Either<string, Skills>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/skills`;

	return await getCallback(path);
};
