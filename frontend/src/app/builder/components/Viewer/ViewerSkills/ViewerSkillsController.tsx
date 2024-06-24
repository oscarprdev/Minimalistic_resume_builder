'use server';

import ViewerSkillsClient from './ViewerSkillsClient';
import { Suspense } from 'react';
import ViewerSkillsServer from './ViewerSkillsServer';
import ViewerSkillsSkeleton from './ViewerSkillsSkeleton';
import { User } from 'next-auth';

interface ViewerSkillsControllerProps {
	resumeId: string | null;
	user?: User;
}

const ViewerSkillsController = async ({ resumeId, user }: ViewerSkillsControllerProps) => {
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
