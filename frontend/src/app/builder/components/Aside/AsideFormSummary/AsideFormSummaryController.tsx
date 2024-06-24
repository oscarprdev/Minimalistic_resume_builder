import { Suspense } from 'react';
import AsideFormSummaryClient from './AsideFormSummaryClient';
import AsideFormSummaryServer from './AsideFormSummaryServer';
import { User } from 'next-auth';
import AsideFormSummarySkeleton from './AsideFormSummarySkeleton';

interface AsideFormSummaryControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormSummaryController = ({ resumeId, user }: AsideFormSummaryControllerProps) => {
	if (!user?.id) {
		return <AsideFormSummaryClient />;
	}

	return (
		<Suspense fallback={<AsideFormSummarySkeleton />}>
			<AsideFormSummaryServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default AsideFormSummaryController;
