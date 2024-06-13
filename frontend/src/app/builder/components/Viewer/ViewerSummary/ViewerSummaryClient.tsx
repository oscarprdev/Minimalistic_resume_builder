'use client';

import ViewerSummary from './ViewerSummary';
import { useResumeSummaryStore } from '@/store/useResumeSummaryStore';

const ViewerSummaryClient = () => {
	const summaryStore = useResumeSummaryStore();

	return (
		<ViewerSummary
			title={summaryStore.resumeSummary.title}
			summary={summaryStore.resumeSummary.summary}
		/>
	);
};

export default ViewerSummaryClient;
