'use server';

import ViewerLanguagesClient from './ViewerLanguagesClient';
import { Suspense } from 'react';
import ViewerLanguagesServer from './ViewerLanguagesServer';
import ViewerLanguagesSkeleton from './ViewerLanguagesSkeleton';
import { User } from 'next-auth';

interface ViewerLanguagesControllerProps {
	resumeId: string | null;
	user?: User;
}

const ViewerLanguagesController = async ({ resumeId, user }: ViewerLanguagesControllerProps) => {
	if (!user?.id) {
		return <ViewerLanguagesClient />;
	}

	return (
		<Suspense fallback={<ViewerLanguagesSkeleton />}>
			<ViewerLanguagesServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerLanguagesController;
