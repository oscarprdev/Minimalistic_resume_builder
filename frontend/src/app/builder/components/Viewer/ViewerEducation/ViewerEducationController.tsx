'use server';

import { useUserLogged } from '@/hooks/use-user-logged';
import ViewerEducationClient from './ViewerEducationClient';
import { Suspense } from 'react';
import ViewerEducationServer from './ViewerEducationServer';

interface ViewerEducationControllerProps {
	resumeId: string | null;
}

const ViewerEducationController = async ({ resumeId }: ViewerEducationControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerEducationClient />;
	}

	return (
		<Suspense fallback={<div className='w-[250px] h-5 animate-pulse rounded-xl bg-gray-300' />}>
			<ViewerEducationServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerEducationController;
