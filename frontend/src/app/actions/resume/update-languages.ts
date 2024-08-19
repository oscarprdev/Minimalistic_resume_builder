'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeLanguagesService } from '@/services/resume-languages-service';
import { Languages } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateLanguagesAction = async (input: Languages, resumeId: string) => {
	const user = await userAuth();
	const resumeLanguagesService = new ResumeLanguagesService({ userId: user.id });

	const response = await resumeLanguagesService.update(input, resumeId);

	revalidatePath('/');

	return response;
};
