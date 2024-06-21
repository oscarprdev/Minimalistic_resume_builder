'use server';

import ViewerEducationController from './ViewerEducation/ViewerEducationController';
import ViewerExperienceController from './ViewerExperience/ViewerExperienceController';
import ViewerHeaderController from './ViewerHeader/ViewerHeaderController';
import ViewerLanguagesController from './ViewerLanguages/ViewerLanguagesController';
import ViewerSkillsController from './ViewerSkills/ViewerSkillsController';
import ViewerSummaryController from './ViewerSummary/ViewerSummaryController';

interface ViewerResumeProps {
	resumeId: string | null;
}

const ViewerResume = async ({ resumeId }: ViewerResumeProps) => {
	return (
		<article className='w-[650px] bg-white shadow-sm h-fit mb-[100px] p-5'>
			<ViewerHeaderController resumeId={resumeId} />
			<ViewerSummaryController resumeId={resumeId} />
			<ViewerExperienceController resumeId={resumeId} />
			<ViewerEducationController resumeId={resumeId} />
			<ViewerLanguagesController resumeId={resumeId} />
			<ViewerSkillsController resumeId={resumeId} />
		</article>
	);
};

export default ViewerResume;
