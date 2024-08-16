'use client';

import ViewerSkills from './ViewerSkills';
import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';

const ViewerSkillsClient = () => {
	const skillsStore = useResumeSkillsStore();

	return (
		<ViewerSkills
			title={skillsStore.resumeSkills.title}
			skillList={skillsStore.resumeSkills.skillList}
		/>
	);
};

export default ViewerSkillsClient;
