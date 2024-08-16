'use server';

import { Resume } from '@/types';
import ViewerResume from './ViewerResume';
import ViewerTitleController from './ViewerTitle/ViewerTitleController';
import { User } from 'next-auth';

interface ViewerProps {
	resumeId: string | null;
	user?: User;
	theme: Resume.theme;
	isSelected: boolean;
}

const Viewer = async ({ resumeId, user, theme, isSelected }: ViewerProps) => {
	return (
		<section
			aria-label='viewer'
			className='grid place-items-center mx-auto p-5 w-full gap-5 h-full overflow-scroll'>
			<ViewerTitleController
				resumeId={resumeId}
				user={user}
			/>
			<ViewerResume
				resumeId={resumeId}
				user={user}
				theme={theme}
				isSelected={isSelected}
			/>
		</section>
	);
};

export default Viewer;
