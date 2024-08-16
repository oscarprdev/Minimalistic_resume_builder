'use server';

import { API_URL } from '@/constants';
import { Either, left } from '@/lib/either';
import { Resume } from '@/types';

export interface DescribeResumeActionInput {
	userId: string;
	resumeId: string;
	getCallback: (path: string) => Promise<Either<string, Resume>>;
}

export const describeResumeAction = async ({
	userId,
	resumeId,
	getCallback,
}: DescribeResumeActionInput): Promise<Either<string, Resume>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/describe`;

	return await getCallback(path);
};
