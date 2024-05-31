'use server';

import { API_URL } from '@/constants';
import { DEFAULT_SKILLS } from '@/data/default-skills';
import { Skills } from '@/types';

export interface DescribeSkillsInput {
	userId?: string;
	resumeId?: string;
}

export interface DescribeSkillsOutput {
	data: Skills;
	error: string | null;
}

export const describeSkills = async ({ resumeId, userId }: DescribeSkillsInput): Promise<DescribeSkillsOutput> => {
	try {
		if (!resumeId || !userId) {
			return {
				data: DEFAULT_SKILLS,
				error: null,
			};
		}

		const response = await fetch(`${API_URL}/resume/${userId}/${resumeId}/skills`, { cache: 'no-store' });

		if (response.status === 404) {
			return {
				data: DEFAULT_SKILLS,
				error: null,
			};
		}

		const data: Skills = await response.json();

		if (data.skillList.length === 0) {
			return {
				data: { ...data, skillList: DEFAULT_SKILLS.skillList },
				error: null,
			};
		}

		return {
			data,
			error: null,
		};
	} catch (error) {
		return {
			data: DEFAULT_SKILLS,
			error: 'Error describing resume skills section',
		};
	}
};
