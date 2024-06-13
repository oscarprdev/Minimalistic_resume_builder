'use server';

import { API_URL } from '@/constants';
import { DEFAULT_EDUCATION } from '@/data/default-education';
import { Education } from '@/types';

export interface DescribeEducationInput {
	userId?: string;
	resumeId?: string;
}

export interface DescribeEducationOutput {
	data: Education;
	error: string | null;
}

export const describeEducation = async ({ resumeId, userId }: DescribeEducationInput): Promise<DescribeEducationOutput> => {
	try {
		if (!resumeId || !userId) {
			return {
				data: DEFAULT_EDUCATION,
				error: null,
			};
		}

		const response = await fetch(`${API_URL}/resume/${userId}/${resumeId}/education`, { cache: 'no-store' });

		if (response.status === 404) {
			return {
				data: DEFAULT_EDUCATION,
				error: null,
			};
		}

		const data: Education = await response.json();

		if (data.educationList.length === 0) {
			return {
				data: { ...data, educationList: DEFAULT_EDUCATION.educationList },
				error: null,
			};
		}

		return {
			data,
			error: null,
		};
	} catch (error) {
		return {
			data: DEFAULT_EDUCATION,
			error: 'Error describing resume education section',
		};
	}
};
