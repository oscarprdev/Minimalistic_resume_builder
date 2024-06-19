'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Header } from '@/types';

export interface DescribeResumeHeaderActionInput {
	userId: string;
	resumeId: string | null;
	getCallback: (path: string) => Promise<Either<string, Header>>;
}

export const describeResumeHeaderAction = async ({
	userId,
	resumeId,
	getCallback,
}: DescribeResumeHeaderActionInput): Promise<Either<string, Header>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/header`;

	return await getCallback(path);
};
