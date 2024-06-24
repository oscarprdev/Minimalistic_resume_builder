import { Suspense } from 'react';
import AsideSkillsClient from './AsideFormSkillsClient';
import AsideSkillsServer from './AsideFormSkillsServer';
import { User } from 'next-auth';
import AsideFormSkillsSkeleton from './AsideFormSkillsSkeleton';

interface AsideFormSkillsControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormSkillsController = ({ resumeId, user }: AsideFormSkillsControllerProps) => {
	if (!user?.id) {
		return <AsideSkillsClient />;
	}

	return (
		<Suspense fallback={<AsideFormSkillsSkeleton />}>
			<AsideSkillsServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default AsideFormSkillsController;
