'use server';

import { useUserLogged } from '@/hooks/useUserLogged';
import ViewerLanguagesClient from './ViewerLanguagesClient';
import { Suspense } from 'react';
import ViewerLanguagesServer from './ViewerLanguagesServer';

interface ViewerLanguagesControllerProps {
	resumeId: string | null;
}

const ViewerLanguagesController = async ({ resumeId }: ViewerLanguagesControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerLanguagesClient />;
	}

	return (
		<Suspense fallback={<div className='w-[250px] h-5 animate-pulse rounded-xl bg-gray-300' />}>
			<ViewerLanguagesServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerLanguagesController;
