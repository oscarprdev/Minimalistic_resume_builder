'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerEducationClient from './ViewerEducationClient';
import { Suspense } from 'react';
import ViewerEducationServer from './ViewerEducationServer';
import ViewerEducationSkeleton from './ViewerEducationSkeleton';

interface ViewerEducationControllerProps {
	resumeId: string | null;
}

const ViewerEducationController = async ({ resumeId }: ViewerEducationControllerProps) => {
	const user = await useUserLogged();

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
