'use client';

import ViewerEducation from './ViewerEducation';
import { useResumeEducationStore } from '@/store/useResumeEducationStore';

const ViewerEducationClient = () => {
	const educationStore = useResumeEducationStore();

	return (
		<ViewerEducation
			title={educationStore.resumeEducation.title}
			educationList={educationStore.resumeEducation.educationList}
		/>
	);
};

export default ViewerEducationClient;
