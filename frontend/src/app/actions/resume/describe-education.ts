'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeEducationService } from '@/services/resume-education-service';

export const describeEducationAction = async (resumeId: string) => {
	const user = await userAuth();

	const resumeEducationService = new ResumeEducationService({ userId: user.id });
	return await resumeEducationService.describe(resumeId);
};
