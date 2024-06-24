'use server';

import { isLeft } from '@/lib/either';
import ViewerSkills from './ViewerSkills';
import { getCallback } from '@/lib/service.utils';
import { DEFAULT_SKILLS_VALUES } from '@/store/useResumeSkillsStore';
import { describeResumeSkillsAction } from '../../Aside/AsideFormSkills/actions/describe-resume-skills';

interface ViewerSkillsServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerSkillsServer = async ({ userId, resumeId }: ViewerSkillsServerProps) => {
	if (!resumeId) {
		return (
			<ViewerSkills
				title={DEFAULT_SKILLS_VALUES.title}
				skillList={DEFAULT_SKILLS_VALUES.skillList}
			/>
		);
	}

	const response = await describeResumeSkillsAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return (
			<ViewerSkills
				title={DEFAULT_SKILLS_VALUES.title}
				skillList={DEFAULT_SKILLS_VALUES.skillList}
				error={response.left}
			/>
		);
	}

	return (
		<ViewerSkills
			title={response.right.title}
			skillList={response.right.skillList}
		/>
	);
};

export default ViewerSkillsServer;
