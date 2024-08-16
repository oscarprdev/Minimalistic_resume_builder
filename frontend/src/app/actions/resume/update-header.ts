'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeHeaderService } from '@/services/resume-header-service';
import { Header } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateHeaderAction = async (input: Header, resumeId: string) => {
	const user = await userAuth();
	const resumeHeaderService = new ResumeHeaderService({ userId: user.id });

	const response = await resumeHeaderService.update(input, resumeId);

	revalidatePath('/');

	return response;
};
