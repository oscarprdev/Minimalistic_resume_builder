'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeSkillsService } from '@/services/resume-skills-service';

export const describeSkillsAction = async (resumeId: string) => {
	const user = await userAuth();

	const resumeSkillsService = new ResumeSkillsService({ userId: user.id });
	return await resumeSkillsService.describe(resumeId);
};
