'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Education } from '@/types';

export interface DescribeResumeEducationActionInput {
	userId: string;
	resumeId: string | null;
	getCallback: (path: string) => Promise<Either<string, Education>>;
}

export const describeResumeEducationAction = async ({
	userId,
	resumeId,
	getCallback,
}: DescribeResumeEducationActionInput): Promise<Either<string, Education>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/education`;

	return await getCallback(path);
};
