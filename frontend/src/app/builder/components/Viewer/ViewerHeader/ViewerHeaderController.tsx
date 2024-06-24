'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerHeaderClient from './ViewerHeaderClient';
import { Suspense } from 'react';
import ViewerHeaderServer from './ViewerHeaderServer';
import ViewerHeaderSkeleton from './ViewerHeaderSkeleton';

interface ViewerHeaderControllerProps {
	resumeId: string | null;
}

const ViewerHeaderController = async ({ resumeId }: ViewerHeaderControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerHeaderClient />;
	}

	return (
		<Suspense fallback={<ViewerHeaderSkeleton />}>
			<ViewerHeaderServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerHeaderController;
