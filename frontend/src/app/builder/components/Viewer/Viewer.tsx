'use server';

import ViewerResume from './ViewerResume';
import ViewerTitleController from './ViewerTitle/ViewerTitleController';

interface ViewerProps {
	resumeId: string | null;
}

const Viewer = async ({ resumeId }: ViewerProps) => {
	return (
		<section className='grid place-items-center mx-auto p-5 w-full gap-5 h-full overflow-scroll'>
			<ViewerTitleController resumeId={resumeId} />
			<ViewerResume resumeId={resumeId} />
		</section>
	);
};

export default Viewer;
