import { Suspense } from 'react';
import AsideFormExperienceClient from './AsideFormExperienceClient';
import AsideFormExperienceServer from './AsideFormExperienceServer';
import { User } from 'next-auth';
import AsideFormExperienceSkeleton from './AsideFormExperienceSkeleton';

interface AsideFormExperienceControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormExperienceController = ({ resumeId, user }: AsideFormExperienceControllerProps) => {
	if (!user?.id) {
		return <AsideFormExperienceClient />;
	}

	return (
		<Suspense fallback={<AsideFormExperienceSkeleton />}>
			<AsideFormExperienceServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default AsideFormExperienceController;
