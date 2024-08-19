'use server';

import { ResumeService } from '@/services/resume-service';

export const describeResumeListAction = async (userId: string, username: string) => {
	const resumeService = new ResumeService({ id: userId, username });
	return await resumeService.describe();
};
