'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeEducationService } from '@/services/resume-education-service';
import { Education } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateEducationAction = async (input: Education, resumeId: string) => {
	const user = await userAuth();
	const resumeEducationService = new ResumeEducationService({ userId: user.id });

	const response = await resumeEducationService.update(input, resumeId);

	revalidatePath('/');

	return response;
};
