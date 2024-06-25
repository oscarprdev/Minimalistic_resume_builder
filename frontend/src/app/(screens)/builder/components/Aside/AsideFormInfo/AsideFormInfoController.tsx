import { Suspense } from 'react';
import AsideFormInfoClient from './AsideFormInfoClient';
import AsideFormInfoServer from './AsideFormInfoServer';
import { User } from 'next-auth';
import AsideFormInfoSkeleton from './AsideFormInfoSkeleton';

interface AsideFormInfoControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormInfoController = ({ resumeId, user }: AsideFormInfoControllerProps) => {
	if (!user?.id) {
		return <AsideFormInfoClient />;
	}

	return (
		<Suspense fallback={<AsideFormInfoSkeleton />}>
			<AsideFormInfoServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default AsideFormInfoController;
