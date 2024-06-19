'use server';

import { useUserLogged } from '@/hooks/use-user-logged';
import ViewerexperienceClient from './ViewerExperienceClient';
import { Suspense } from 'react';
import ViewerexperienceServer from './ViewerExperienceServer';

interface ViewerExperienceControllerProps {
	resumeId: string | null;
}

const ViewerExperienceController = async ({ resumeId }: ViewerExperienceControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerexperienceClient />;
	}

	return (
		<Suspense fallback={<div className='w-[250px] h-5 animate-pulse rounded-xl bg-gray-300' />}>
			<ViewerexperienceServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerExperienceController;
