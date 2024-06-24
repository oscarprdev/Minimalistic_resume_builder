import { useUserLogged } from '@/hooks/useUserLogged';
import React, { Suspense } from 'react';
import ViewerTitleClient from './ViewerTitleClient';
import ViewerTitleServer from './ViewerTitleServer';

interface ViewerTitleControllerProps {
	resumeId: string | null;
}

const ViewerTitleController = async ({ resumeId }: ViewerTitleControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerTitleClient />;
	}

	return (
		<Suspense fallback={<div className='w-[200px] h-5 bg-gray-200 animate-pulse'></div>}>
			<ViewerTitleServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerTitleController;
