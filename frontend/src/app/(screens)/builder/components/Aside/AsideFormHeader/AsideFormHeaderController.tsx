import AsideFormHeaderClient from './AsideFormHeaderClient';
import AsideFormHeaderServer from './AsideFormHeaderServer';
import { User } from 'next-auth';
import AsideFormHeaderSkeleton from './AsideFormHeaderSkeleton';
import { Suspense } from 'react';

interface AsideFormHeaderControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormHeaderController = ({ resumeId, user }: AsideFormHeaderControllerProps) => {
	if (!user?.id) {
		return <AsideFormHeaderClient />;
	}

	return (
		<Suspense fallback={<AsideFormHeaderSkeleton />}>
			<AsideFormHeaderServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default AsideFormHeaderController;
