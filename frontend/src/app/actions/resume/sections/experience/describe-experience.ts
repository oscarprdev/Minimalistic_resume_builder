'use server';

import { API_URL } from '@/constants';
import { DEFAULT_EXPERIENCE } from '@/data/default-experience';
import { Experience } from '@/types';

export interface DescribeExperienceInput {
	userId?: string;
	resumeId?: string;
}

export interface DescribeExperienceOutput {
	data: Experience;
	error: string | null;
}

export const describeExperience = async ({ resumeId, userId }: DescribeExperienceInput): Promise<DescribeExperienceOutput> => {
	try {
		if (!resumeId || !userId) {
			return {
				data: DEFAULT_EXPERIENCE,
				error: null,
			};
		}

		const response = await fetch(`${API_URL}/resume/${userId}/${resumeId}/experience`, { cache: 'no-store' });

		if (response.status === 404) {
			return {
				data: DEFAULT_EXPERIENCE,
				error: null,
			};
		}

		const data: Experience = await response.json();

		return {
			data,
			error: null,
		};
	} catch (error) {
		return {
			data: DEFAULT_EXPERIENCE,
			error: 'Error describing resume experience section',
		};
	}
};
