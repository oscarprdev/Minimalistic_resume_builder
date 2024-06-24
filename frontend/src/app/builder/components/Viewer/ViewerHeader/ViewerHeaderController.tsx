'use server';

import ViewerHeaderClient from './ViewerHeaderClient';
import { Suspense } from 'react';
import ViewerHeaderServer from './ViewerHeaderServer';
import ViewerHeaderSkeleton from './ViewerHeaderSkeleton';
import { User } from 'next-auth';

interface ViewerHeaderControllerProps {
	resumeId: string | null;
	user?: User;
}

const ViewerHeaderController = async ({ resumeId, user }: ViewerHeaderControllerProps) => {
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
