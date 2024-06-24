'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerSkillsClient from './ViewerSkillsClient';
import { Suspense } from 'react';
import ViewerSkillsServer from './ViewerSkillsServer';

interface ViewerSkillsControllerProps {
	resumeId: string | null;
}

const ViewerSkillsController = async ({ resumeId }: ViewerSkillsControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerSkillsClient />;
	}

	return (
		<Suspense fallback={<div className='w-[250px] h-5 animate-pulse rounded-xl bg-gray-300' />}>
			<ViewerSkillsServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerSkillsController;
