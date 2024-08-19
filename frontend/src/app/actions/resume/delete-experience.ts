'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeExperienceService } from '@/services/resume-experience-service';
import { revalidatePath } from 'next/cache';

export const deleteExperienceAction = async (resumeId: string) => {
	const user = await userAuth();
	const resumeExperienceService = new ResumeExperienceService({ userId: user.id });

	const response = await resumeExperienceService.delete(resumeId);

	revalidatePath('/');

	return response;
};
