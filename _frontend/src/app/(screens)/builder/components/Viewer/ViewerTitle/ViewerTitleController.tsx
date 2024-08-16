import ViewerTitleClient from './ViewerTitleClient';
import ViewerTitleServer from './ViewerTitleServer';
import { Suspense } from 'react';
import { User } from 'next-auth';

interface ViewerTitleControllerProps {
	resumeId: string | null;
	user?: User;
}

const ViewerTitleController = ({ resumeId, user }: ViewerTitleControllerProps) => {
	if (!user?.id) {
		return <ViewerTitleClient />;
	}

	return (
		<Suspense fallback={<div className='w-[200px] h-5 bg-gray-200 animate-pulse'></div>}>
			<ViewerTitleServer
				userId={user.id}
				resumeId={resumeId}
			/>
		</Suspense>
	);
};

export default ViewerTitleController;
