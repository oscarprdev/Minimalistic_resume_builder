'use server';

import { API_URL } from '@/constants';
import { Either } from '@/lib/either';
import { Resume } from '@/types';

export interface ListResumeActionInput {
	userId: string;
	getCallback: (path: string) => Promise<Either<string, Resume[]>>;
}

export const listResumeAction = async ({ userId, getCallback }: ListResumeActionInput): Promise<Either<string, Resume[]>> => {
	const path = `${API_URL}/resume/${userId}/list`;

	return await getCallback(path);
};
