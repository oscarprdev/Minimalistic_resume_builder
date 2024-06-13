'use server';

import ViewerResume from './ViewerResume';
import { useUserLogged } from '@/hooks/use-user-logged';
import ViewerTitleController from './ViewerTitle/ViewerTitleController';

interface ViewerProps {
	resumeId: string | null;
}

const Viewer = async ({ resumeId }: ViewerProps) => {
	return (
		<section className='grid place-items-center mx-auto p-5 w-full gap-5'>
			<ViewerTitleController resumeId={resumeId} />
			<ViewerResume resumeId={resumeId} />
		</section>
	);
};

export default Viewer;
