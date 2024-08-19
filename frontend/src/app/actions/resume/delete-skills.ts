'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeSkillsService } from '@/services/resume-skills-service';
import { revalidatePath } from 'next/cache';

export const deleteSkillsAction = async (resumeId: string) => {
	const user = await userAuth();
	const resumeSkillsService = new ResumeSkillsService({ userId: user.id });

	const response = await resumeSkillsService.delete(resumeId);

	revalidatePath('/');

	return response;
};
