import ViewerExperienceClient from './ViewerExperienceClient';
import { Suspense } from 'react';
import ViewerExperienceServer from './ViewerExperienceServer';
import ViewerExperienceSkeleton from './ViewerExperienceSkeleton';
import { User } from 'next-auth';

interface ViewerExperienceControllerProps {
	resumeId: string | null;
	user?: User;
}

const ViewerExperienceController = ({ resumeId, user }: ViewerExperienceControllerProps) => {
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
