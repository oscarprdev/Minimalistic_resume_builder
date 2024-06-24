'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerEducationClient from './ViewerEducationClient';
import { Suspense } from 'react';
import ViewerEducationServer from './ViewerEducationServer';
import ViewerEducationSkeleton from './ViewerEducationSkeleton';
import { User } from 'next-auth';

interface ViewerEducationControllerProps {
	resumeId: string | null;
	user?: User;
}

const ViewerEducationController = async ({ resumeId, user }: ViewerEducationControllerProps) => {
	if (!user?.id) {
		return <ViewerEducationClient />;
	}

	return (
		<Suspense fallback={<ViewerEducationSkeleton />}>
			<ViewerEducationServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerEducationController;
