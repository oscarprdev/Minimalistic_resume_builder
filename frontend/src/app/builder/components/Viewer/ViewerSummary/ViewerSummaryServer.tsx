'use server';

import { isLeft } from '@/lib/either';
import ViewerSummary from './ViewerSummary';
import { describeResumeSummaryAction } from '@/app/builder/actions/describe-resume-summary';
import { getCallback } from '@/lib/service.utils';
import { DEFAULT_SUMMARY_VALUES } from '@/store/useResumeSummaryStore';

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
		/>
	);
};

export default ViewerSummaryServer;
