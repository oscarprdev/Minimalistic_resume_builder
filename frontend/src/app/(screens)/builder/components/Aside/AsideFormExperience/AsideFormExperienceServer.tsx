'use server';

import { postCallback, getCallback } from '@/services';
import AsideFormExperience from './AsideFormExperience';
import { z } from 'zod';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { FormExperienceValues, asideFormExperienceSchema } from './schema-validations';
import { updateResumeExperienceAction } from './actions/update-resume-experience';
import { describeResumeExperienceAction } from './actions/describe-resume-experience';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { ResumeExperienceDefaultValues } from '@/store/useResumeExperienceStore';

interface AsideFormExperienceServerProps {
	userId: string;
	resumeId?: string | null;
}

const DEFAULT_EXPERIENCE_VALUES: ResumeExperienceDefaultValues = {
	title: '',
	jobList: [],
};

const AsideFormExperienceServer = async ({ userId, resumeId }: AsideFormExperienceServerProps) => {
	const handleServerSubmit = async (values: FormExperienceValues): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeExperienceAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, jobList: values.jobList },
			postCallback,
		});
	};

	if (!resumeId) {
		return (
			<AsideFormExperience
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_EXPERIENCE_VALUES}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.experience) {
		return (
			<AsideFormExperience
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_EXPERIENCE_VALUES}
			/>
		);
	}

	const response = await describeResumeExperienceAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormExperience
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
			userId={userId}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormExperienceServer;
