'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Summary } from '@/types';

export interface DescribeResumeSummaryActionInput {
	userId: string;
	resumeId: string | null;
	getCallback: (path: string) => Promise<Either<string, Summary>>;
}

export const describeResumeSummaryAction = async ({
	userId,
	resumeId,
	getCallback,
}: DescribeResumeSummaryActionInput): Promise<Either<string, Summary>> => {
	const path = `${API_URL}/resume/${userId}/${resumeId}/summary`;

	return await getCallback(path);
};
