'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeExperienceService } from '@/services/resume-experience-service';

export const describeExperienceAction = async (resumeId: string) => {
	const user = await userAuth();

	const resumeExperienceService = new ResumeExperienceService({ userId: user.id });
	return await resumeExperienceService.describe(resumeId);
};
