'use server';

import { isLeft } from '@/lib/either';
import ViewerSummary from './ViewerSummary';
import { describeResumeSummaryAction } from '@/app/builder/actions/describe-resume-summary';
import { getCallback } from '@/lib/service.utils';
import { toast } from '@/components/ui/use-toast';
import { ResumeSummaryDefaultValues } from '@/store/useResumeSummaryStore';

interface ViewerSummaryServerProps {
	userId: string;
	resumeId: string | null;
}

const DEFAULT_FIELDS: ResumeSummaryDefaultValues = {
	title: 'About me',
	summary: 'Your professional summary',
};

const ViewerSummaryServer = async ({ userId, resumeId }: ViewerSummaryServerProps) => {
	const response = await describeResumeSummaryAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		// toast({ variant: 'destructive', description: response.left });
	}

	const isSuccess = !isLeft(response) && resumeId;

	return (
		<ViewerSummary
			title={isSuccess ? response.right.title : DEFAULT_FIELDS.title}
			summary={isSuccess ? response.right.summary : DEFAULT_FIELDS.summary}
		/>
	);
};

export default ViewerSummaryServer;
