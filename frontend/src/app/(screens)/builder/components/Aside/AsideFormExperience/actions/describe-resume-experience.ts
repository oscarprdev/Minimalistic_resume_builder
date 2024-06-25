'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Experience } from '@/types';

export interface DescribeResumeExperienceActionInput {
	userId: string;
	resumeId: string | null;
	getCallback: (path: string) => Promise<Either<string, Experience>>;
}

export const describeResumeExperienceAction = async ({
	userId,
	resumeId,
	getCallback,
}: DescribeResumeExperienceActionInput): Promise<Either<string, Experience>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/experience`;

	return await getCallback(path);
};
