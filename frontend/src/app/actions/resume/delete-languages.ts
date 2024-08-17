'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeLanguagesService } from '@/services/resume-languages-service';
import { revalidatePath } from 'next/cache';

export const deleteLanguagesAction = async (resumeId: string) => {
	const user = await userAuth();
	const resumeLanguagesService = new ResumeLanguagesService({ userId: user.id });

	const response = await resumeLanguagesService.delete(resumeId);

	revalidatePath('/');

	return response;
};
