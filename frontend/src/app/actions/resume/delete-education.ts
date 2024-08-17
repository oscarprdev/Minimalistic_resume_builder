'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeEducationService } from '@/services/resume-education-service';
import { revalidatePath } from 'next/cache';

export const deleteEducationAction = async (resumeId: string) => {
	const user = await userAuth();
	const resumeEducationService = new ResumeEducationService({ userId: user.id });

	const response = await resumeEducationService.delete(resumeId);

	revalidatePath('/');

	return response;
};
