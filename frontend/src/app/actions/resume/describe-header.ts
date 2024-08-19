'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeHeaderService } from '@/services/resume-header-service';
import { revalidatePath } from 'next/cache';

export const describeHeaderAction = async (resumeId: string) => {
	const user = await userAuth();

	const resumeHeaderService = new ResumeHeaderService({ userId: user.id });

	return await resumeHeaderService.describe(resumeId);
};
