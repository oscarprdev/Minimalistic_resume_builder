'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerLanguagesClient from './ViewerLanguagesClient';
import { Suspense } from 'react';
import ViewerLanguagesServer from './ViewerLanguagesServer';
import ViewerLanguagesSkeleton from './ViewerLanguagesSkeleton';

interface ViewerLanguagesControllerProps {
	resumeId: string | null;
}

const ViewerLanguagesController = async ({ resumeId }: ViewerLanguagesControllerProps) => {
	const user = await useUserLogged();

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
