'use server';

import { userAuth } from '../shared/user-auth';
import { ResumeService } from '@/services/resume-service';

export const createResumeAction = async () => {
	const user = await userAuth();
	const resumeService = new ResumeService({ id: user.id, username: user.username });

	return await resumeService.create();
};
