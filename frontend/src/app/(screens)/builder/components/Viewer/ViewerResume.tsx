'use server';

import { User } from 'next-auth';
import ViewerEducationController from './ViewerEducation/ViewerEducationController';
import ViewerExperienceController from './ViewerExperience/ViewerExperienceController';
import ViewerHeaderController from './ViewerHeader/ViewerHeaderController';
import ViewerLanguagesController from './ViewerLanguages/ViewerLanguagesController';
import ViewerSkillsController from './ViewerSkills/ViewerSkillsController';
import ViewerSummaryController from './ViewerSummary/ViewerSummaryController';

interface ViewerResumeProps {
	resumeId: string | null;
	user?: User;
}

const ViewerResume = async ({ resumeId, user }: ViewerResumeProps) => {
	return (
		<article
			id='resume-viewer'
			className='w-[650px] min-h-[1000px] bg-white shadow-sm h-fit mb-[100px] p-5'>
			<ViewerHeaderController
				resumeId={resumeId}
				user={user}
			/>
			<ViewerSummaryController
				resumeId={resumeId}
				user={user}
			/>
			<ViewerExperienceController
				resumeId={resumeId}
				user={user}
			/>
			<ViewerEducationController
				resumeId={resumeId}
				user={user}
			/>
			<div className='flex flex-wrap gap-5'>
				<ViewerLanguagesController
					resumeId={resumeId}
					user={user}
				/>
				<ViewerSkillsController
					resumeId={resumeId}
					user={user}
				/>
			</div>
		</article>
	);
};

export default ViewerResume;
