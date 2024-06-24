import { Suspense } from 'react';
import AsideEducationClient from './AsideFormEducationClient';
import AsideEducationServer from './AsideFormEducationServer';
import { User } from 'next-auth';
import AsideFormEducationSkeleton from './AsideFormEducationSkeleton';

interface AsideFormEducationControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormEducationController = ({ resumeId, user }: AsideFormEducationControllerProps) => {
	if (!user?.id) {
		return <AsideEducationClient />;
	}

	return (
		<Suspense fallback={<AsideFormEducationSkeleton />}>
			<AsideEducationServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default AsideFormEducationController;
