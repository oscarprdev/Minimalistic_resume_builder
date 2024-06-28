'use server';

import { isLeft } from '@/lib/either';
import ViewerSummary from './ViewerSummary';
import { getCallback } from '@/services';
import { DEFAULT_SUMMARY_VALUES } from '@/store/useResumeSummaryStore';
import { describeResumeSummaryAction } from '../../Aside/AsideFormSummary/actions/describe-resume-summary';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';

interface ViewerSummaryServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerSummaryServer = async ({ userId, resumeId }: ViewerSummaryServerProps) => {
	if (!resumeId) {
		return (
			<ViewerSummary
				title={DEFAULT_SUMMARY_VALUES.title}
				summary={DEFAULT_SUMMARY_VALUES.summary}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.summary) {
		return (
			<ViewerSummary
				title={DEFAULT_SUMMARY_VALUES.title}
				summary={DEFAULT_SUMMARY_VALUES.summary}
			/>
		);
	}

	const response = await describeResumeSummaryAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return (
			<ViewerSummary
				title={DEFAULT_SUMMARY_VALUES.title}
				summary={DEFAULT_SUMMARY_VALUES.summary}
				error={response.left}
			/>
		);
	}

	return (
		<ViewerSummary
			title={response.right.title}
			summary={response.right.summary}
			isSectionHidden={response.right.isHidden}
		/>
	);
};

export default ViewerSummaryServer;
