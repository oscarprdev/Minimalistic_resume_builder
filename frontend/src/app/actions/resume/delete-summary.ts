'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeSummaryService } from '@/services/resume-summary-service';
import { revalidatePath } from 'next/cache';

export const deleteSummaryAction = async (resumeId: string) => {
	const user = await userAuth();
	const resumeSummaryService = new ResumeSummaryService({ userId: user.id });

	const response = await resumeSummaryService.delete(resumeId);

	revalidatePath('/');

	return response;
};
