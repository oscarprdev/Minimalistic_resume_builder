'use server';

import { API_URL } from '@/constants';
import { DEFAULT_HEADER } from '@/data/default-header';
import { Header } from '@/types';

export interface DescribeHeaderInput {
	userId?: string;
	resumeId?: string;
}

export interface DescribeHeaderOutput {
	data: Header;
	error: string | null;
}

export const describeHeader = async ({ resumeId, userId }: DescribeHeaderInput): Promise<DescribeHeaderOutput> => {
	try {
		if (!resumeId || !userId) {
			return {
				data: DEFAULT_HEADER,
				error: null,
			};
		}

		const response = await fetch(`${API_URL}/resume/${userId}/${resumeId}/header`, { cache: 'no-store' });
		const data: Header = await response.json();

		return {
			data,
			error: null,
		};
	} catch (error) {
		return {
			data: DEFAULT_HEADER,
			error: 'Error describing resume header section',
		};
	}
};
