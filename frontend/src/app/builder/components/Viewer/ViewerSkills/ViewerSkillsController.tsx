'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerSkillsClient from './ViewerSkillsClient';
import { Suspense } from 'react';
import ViewerSkillsServer from './ViewerSkillsServer';
import ViewerSkillsSkeleton from './ViewerSkillsSkeleton';

interface ViewerSkillsControllerProps {
	resumeId: string | null;
}

const ViewerSkillsController = async ({ resumeId }: ViewerSkillsControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerSkillsClient />;
	}

	return (
		<Suspense fallback={<ViewerSkillsSkeleton />}>
			<ViewerSkillsServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerSkillsController;
