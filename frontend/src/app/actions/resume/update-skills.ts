'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeSkillsService } from '@/services/resume-skills-service';
import { Skills } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateSkillsAction = async (input: Skills, resumeId: string) => {
	const user = await userAuth();
	const resumeSkillsService = new ResumeSkillsService({ userId: user.id });

	const response = await resumeSkillsService.update(input, resumeId);

	revalidatePath('/');

	return response;
};
