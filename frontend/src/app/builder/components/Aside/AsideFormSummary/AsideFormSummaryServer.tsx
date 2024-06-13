'use server';

import { postCallback, getCallback } from '@/lib/service.utils';
import AsideFormSummary, { asideFormSummarySchema } from './AsideFormSummary';
import { z } from 'zod';
import { updateResumeSummaryAction } from '@/app/builder/actions/update-resume-summary';
import { Either, isLeft } from '@/lib/either';
import { describeResumeSummaryAction } from '@/app/builder/actions/describe-resume-summary';
import ErrorMessage from '../../ErrorMessage';
import { DEFAULT_SUMMARY_VALUES } from '@/store/useResumeSummaryStore';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';

interface AsideFormSummaryServerProps {
	userId: string;
	resumeId?: string | null;
}

const AsideFormSummaryServer = async ({ userId, resumeId }: AsideFormSummaryServerProps) => {
	const handleServerSubmit = async (values: z.infer<typeof asideFormSummarySchema>): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeSummaryAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, summary: values.summary },
			postCallback,
		});
	};

	if (!resumeId) {
		return (
			<AsideFormSummary
				defaultValues={DEFAULT_SUMMARY_VALUES}
				handleSubmit={handleServerSubmit}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.summary) {
		return (
			<AsideFormSummary
				defaultValues={DEFAULT_SUMMARY_VALUES}
				handleSubmit={handleServerSubmit}
			/>
		);
	}

	const response = await describeResumeSummaryAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}
	

	return (
		<AsideFormSummary
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
		/>
	);
};

export default AsideFormSummaryServer;
