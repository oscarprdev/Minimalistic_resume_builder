'use server';

import { User } from 'next-auth';
import ViewerEducationController from './ViewerEducation/ViewerEducationController';
import ViewerExperienceController from './ViewerExperience/ViewerExperienceController';
import ViewerHeaderController from './ViewerHeader/ViewerHeaderController';
import ViewerLanguagesController from './ViewerLanguages/ViewerLanguagesController';
import ViewerSkillsController from './ViewerSkills/ViewerSkillsController';
import ViewerSummaryController from './ViewerSummary/ViewerSummaryController';
import { Resume } from '@/types';
import { cn } from '@/lib/utils';

interface ViewerResumeProps {
	resumeId: string | null;
	user?: User;
	theme: Resume.theme;
	isSelected: boolean;
}

const ViewerResume = async ({ resumeId, user, theme, isSelected }: ViewerResumeProps) => {
	return (
		<article
			id={`resume-viewer-${theme}`}
			className={cn('relative min-h-[1000px] bg-white shadow-sm h-fit mb-[100px] p-5', isSelected ? 'w-[650px]' : 'w-[800px]')}>
			<ViewerHeaderController
				resumeId={resumeId}
				user={user}
			/>
			<div className={cn('w-full flex flex-col', theme === Resume.theme.VERTICAL && 'flex-row items-start')}>
				<div className={cn('w-full flex flex-col', theme === Resume.theme.VERTICAL && 'w-[65%]')}>
					<ViewerSummaryController
						resumeId={resumeId}
						user={user}
					/>
					<ViewerExperienceController
						resumeId={resumeId}
						user={user}
					/>
				</div>

				<div className={cn('w-full flex flex-col', theme === Resume.theme.VERTICAL && 'items-center text-center w-[35%]')}>
					<ViewerEducationController
						resumeId={resumeId}
						user={user}
					/>
					<div className={cn('flex items-start', theme === Resume.theme.VERTICAL && 'flex flex-col items-center')}>
						<ViewerLanguagesController
							resumeId={resumeId}
							user={user}
						/>
						<ViewerSkillsController
							resumeId={resumeId}
							user={user}
						/>
					</div>
				</div>
			</div>
			{theme === Resume.theme.VERTICAL && (
				<span
					aria-hidden
					className='absolute right-[35%] top-10 w-[1px] h-[90%] block bg-gray-200'></span>
			)}
		</article>
	);
};

export default ViewerResume;
