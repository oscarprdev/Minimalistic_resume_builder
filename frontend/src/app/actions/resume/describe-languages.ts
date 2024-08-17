'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeLanguagesService } from '@/services/resume-languages-service';

export const describeLanguagesAction = async (resumeId: string) => {
	const user = await userAuth();

	const resumeLanguagesService = new ResumeLanguagesService({ userId: user.id });
	return await resumeLanguagesService.describe(resumeId);
};
