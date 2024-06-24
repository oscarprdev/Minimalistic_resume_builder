'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerExperienceClient from './ViewerExperienceClient';
import { Suspense } from 'react';
import ViewerExperienceServer from './ViewerExperienceServer';

interface ViewerExperienceControllerProps {
	resumeId: string | null;
}

const ViewerExperienceController = async ({ resumeId }: ViewerExperienceControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerExperienceClient />;
	}

	return (
		<Suspense fallback={<div className='w-[250px] h-5 animate-pulse rounded-xl bg-gray-300' />}>
			<ViewerExperienceServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerExperienceController;
