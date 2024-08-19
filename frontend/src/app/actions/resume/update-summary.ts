'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeSummaryService } from '@/services/resume-summary-service';
import { Summary } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateSummaryAction = async (input: Summary, resumeId: string) => {
	const user = await userAuth();
	const resumeSummaryService = new ResumeSummaryService({ userId: user.id });

	const response = await resumeSummaryService.update(input, resumeId);

	revalidatePath('/');

	return response;
};
