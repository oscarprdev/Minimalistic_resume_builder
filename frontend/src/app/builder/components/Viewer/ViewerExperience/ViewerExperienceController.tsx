'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerExperienceClient from './ViewerExperienceClient';
import { Suspense } from 'react';
import ViewerExperienceServer from './ViewerExperienceServer';
import ViewerExperienceSkeleton from './ViewerExperienceSkeleton';

interface ViewerExperienceControllerProps {
	resumeId: string | null;
}

const ViewerExperienceController = async ({ resumeId }: ViewerExperienceControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerExperienceClient />;
	}

	return (
		<Suspense fallback={<ViewerExperienceSkeleton />}>
			<ViewerExperienceServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerExperienceController;
