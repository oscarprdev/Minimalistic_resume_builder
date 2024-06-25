'use server';

import { postCallback, getCallback } from '@/services';
import AsideFormSummary, { asideFormSummarySchema } from './AsideFormSummary';
import { z } from 'zod';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { updateResumeSummaryAction } from './actions/update-resume-summary';
import { describeResumeSummaryAction } from './actions/describe-resume-summary';
import { ResumeSummaryDefaultValues } from '@/store/useResumeSummaryStore';

interface AsideFormSummaryServerProps {
	userId: string;
	resumeId?: string | null;
}

const DEFAULT_SUMMARY_VALUES: ResumeSummaryDefaultValues = {
	title: '',
	summary: '',
};

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
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_SUMMARY_VALUES}
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
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_SUMMARY_VALUES}
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
