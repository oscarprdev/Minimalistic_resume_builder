'use server';

import { postCallback, getCallback } from '@/lib/service.utils';
import AsideFormExperience from './AsideFormExperience';
import { z } from 'zod';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { asideFormExperienceSchema } from './schema-validations';
import { updateResumeExperienceAction } from './actions/update-resume-experience';
import { describeResumeExperienceAction } from './actions/describe-resume-experience';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';

interface AsideFormExperienceServerProps {
	userId: string;
	resumeId?: string | null;
}

const AsideFormExperienceServer = async ({ userId, resumeId }: AsideFormExperienceServerProps) => {
	const handleServerSubmit = async (values: z.infer<typeof asideFormExperienceSchema>): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeExperienceAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, jobList: values.jobList },
			postCallback,
		});
	};

	if (!resumeId) {
		return <AsideFormExperience handleSubmit={handleServerSubmit} />;
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.experience) {
		return <AsideFormExperience handleSubmit={handleServerSubmit} />;
	}

	const response = await describeResumeExperienceAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormExperience
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
		/>
	);
};

export default AsideFormExperienceServer;
