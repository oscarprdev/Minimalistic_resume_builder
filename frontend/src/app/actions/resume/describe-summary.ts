'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeSummaryService } from '@/services/resume-summary-service';

export const describeSummaryAction = async (resumeId: string) => {
	const user = await userAuth();

	const resumeSummaryService = new ResumeSummaryService({ userId: user.id });
	return await resumeSummaryService.describe(resumeId);
};
