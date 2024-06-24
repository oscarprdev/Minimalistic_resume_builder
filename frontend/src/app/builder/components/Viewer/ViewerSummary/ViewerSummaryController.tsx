'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerSummaryClient from './ViewerSummaryClient';
import { Suspense } from 'react';
import ViewerSummaryServer from './ViewerSummaryServer';

interface ViewerSummaryControllerProps {
	resumeId: string | null;
}

const ViewerSummaryController = async ({ resumeId }: ViewerSummaryControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerSummaryClient />;
	}

	return (
		<Suspense fallback={<div className='w-[250px] h-5 animate-pulse rounded-xl bg-gray-300' />}>
			<ViewerSummaryServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerSummaryController;
