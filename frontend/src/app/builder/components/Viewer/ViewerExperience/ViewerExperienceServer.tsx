'use server';

import { isLeft } from '@/lib/either';
import ViewerExperience from './ViewerExperience';
import { describeResumeExperienceAction } from '@/app/builder/actions/describe-resume-experience';
import { getCallback } from '@/lib/service.utils';
import { DEFAULT_EXPERIENCE_VALUES } from '@/store/useResumeExperienceStore';

interface ViewerExperienceServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerExperienceServer = async ({ userId, resumeId }: ViewerExperienceServerProps) => {
	if (!resumeId) {
		return (
			<ViewerExperience
				title={DEFAULT_EXPERIENCE_VALUES.title}
				jobList={DEFAULT_EXPERIENCE_VALUES.jobList}
			/>
		);
	}

	const response = await describeResumeExperienceAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return (
			<ViewerExperience
				title={DEFAULT_EXPERIENCE_VALUES.title}
				jobList={DEFAULT_EXPERIENCE_VALUES.jobList}
				error={response.left}
			/>
		);
	}

	return (
		<ViewerExperience
			title={response.right.title}
			jobList={response.right.jobList}
		/>
	);
};

export default ViewerExperienceServer;
