'use server';

import ViewerSummaryClient from './ViewerSummaryClient';
import { Suspense } from 'react';
import ViewerSummaryServer from './ViewerSummaryServer';
import ViewerSummarySkeleton from './ViewerSummarySkeleton';
import { User } from 'next-auth';

interface ViewerSummaryControllerProps {
	resumeId: string | null;
	user?: User;
}

const ViewerSummaryController = async ({ resumeId, user }: ViewerSummaryControllerProps) => {
	if (!user?.id) {
		return <ViewerSummaryClient />;
	}

	return (
		<Suspense fallback={<ViewerSummarySkeleton />}>
			<ViewerSummaryServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerSummaryController;
