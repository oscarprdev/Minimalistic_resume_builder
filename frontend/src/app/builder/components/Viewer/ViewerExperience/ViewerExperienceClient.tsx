'use client';

import ViewerExperience from './ViewerExperience';
import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';

const ViewerExperienceClient = () => {
	const experienceStore = useResumeExperienceStore();

	return (
		<ViewerExperience
			title={experienceStore.resumeExperience.title}
			jobList={experienceStore.resumeExperience.jobList}
		/>
	);
};

export default ViewerExperienceClient;
