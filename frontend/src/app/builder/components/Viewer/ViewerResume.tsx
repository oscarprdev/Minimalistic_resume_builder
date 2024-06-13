'use server';

import ViewerSummaryController from './ViewerSummary/ViewerSummaryController';

interface ViewerResumeProps {
	resumeId: string | null;
}

const ViewerResume = async ({ resumeId }: ViewerResumeProps) => {
	return (
		<article className='w-[650px] bg-white shadow-sm h-[800px]'>
			<ViewerSummaryController resumeId={resumeId} />
		</article>
	);
};

export default ViewerResume;
