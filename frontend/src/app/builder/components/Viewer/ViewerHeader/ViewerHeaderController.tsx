'use server';

import { useUserLogged } from '@/hooks/use-user-logged';
import ViewerHeaderClient from './ViewerHeaderClient';
import { Suspense } from 'react';
import ViewerHeaderServer from './ViewerHeaderServer';

interface ViewerHeaderControllerProps {
	resumeId: string | null;
}

const ViewerHeaderController = async ({ resumeId }: ViewerHeaderControllerProps) => {
	const user = await useUserLogged();

	if (!user?.id) {
		return <ViewerHeaderClient />;
	}

	return (
		<Suspense fallback={<div className='w-[250px] h-5 animate-pulse rounded-xl bg-gray-300' />}>
			<ViewerHeaderServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerHeaderController;
