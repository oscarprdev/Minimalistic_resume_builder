'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Languages } from '@/types';

export interface DescribeResumeLanguagesActionInput {
	userId: string;
	resumeId: string | null;
	getCallback: (path: string) => Promise<Either<string, Languages>>;
}

export const describeResumeLanguagesAction = async ({
	userId,
	resumeId,
	getCallback,
}: DescribeResumeLanguagesActionInput): Promise<Either<string, Languages>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/languages`;

	return await getCallback(path);
};
