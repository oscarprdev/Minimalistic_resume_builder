'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerSummaryClient from './ViewerSummaryClient';
import { Suspense } from 'react';
import ViewerSummaryServer from './ViewerSummaryServer';
import ViewerSummarySkeleton from './ViewerSummarySkeleton';

interface ViewerSummaryControllerProps {
	resumeId: string | null;
}

const ViewerSummaryController = async ({ resumeId }: ViewerSummaryControllerProps) => {
	const user = await useUserLogged();

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
