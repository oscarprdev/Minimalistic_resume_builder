'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeExperienceService } from '@/services/resume-experience-service';
import { Experience } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateExperienceAction = async (input: Experience, resumeId: string) => {
	const user = await userAuth();
	const resumeExperienceService = new ResumeExperienceService({ userId: user.id });

	const response = await resumeExperienceService.update(input, resumeId);

	revalidatePath('/');

	return response;
};
