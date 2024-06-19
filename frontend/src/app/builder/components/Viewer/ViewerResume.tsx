'use server';

import ViewerExperienceController from './ViewerExperience/ViewerExperienceController';
import ViewerHeaderController from './ViewerHeader/ViewerHeaderController';
import ViewerSummaryController from './ViewerSummary/ViewerSummaryController';

interface ViewerResumeProps {
	resumeId: string | null;
}

const ViewerResume = async ({ resumeId }: ViewerResumeProps) => {
	return (
		<article className='w-[650px] bg-white shadow-sm h-[800px] mb-[100px]'>
			<ViewerHeaderController resumeId={resumeId} />
			<ViewerSummaryController resumeId={resumeId} />
			<ViewerExperienceController resumeId={resumeId} />
		</article>
	);
};

export default ViewerResume;
