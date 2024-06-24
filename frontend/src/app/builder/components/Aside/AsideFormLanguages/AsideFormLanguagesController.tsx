import { User } from 'next-auth';
import AsideLanguagesClient from './AsideFormLanguagesClient';
import AsideLanguagesServer from './AsideFormLanguagesServer';
import { Suspense } from 'react';
import AsideFormLanguagesSkeleton from './AsideFormLanguagesSkeleton';

interface AsideFormLanguagesControllerProps {
	resumeId: string | null;
	user?: User;
}

const AsideFormLanguagesController = ({ resumeId, user }: AsideFormLanguagesControllerProps) => {
	if (!user?.id) {
		return <AsideLanguagesClient />;
	}

	return (
		<Suspense fallback={<AsideFormLanguagesSkeleton />}>
			<AsideLanguagesServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default AsideFormLanguagesController;
