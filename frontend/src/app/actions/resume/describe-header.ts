'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeHeaderService } from '@/services/resume-header-service';

export const describeHeaderAction = async (resumeId: string) => {
	const user = await userAuth();

	const resumeHeaderService = new ResumeHeaderService({ userId: user.id });
	return await resumeHeaderService.describe(resumeId);
};
