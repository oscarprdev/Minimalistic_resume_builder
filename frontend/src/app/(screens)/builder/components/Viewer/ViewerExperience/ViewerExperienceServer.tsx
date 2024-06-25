'use server';

import { isLeft } from '@/lib/either';
import ViewerExperience from './ViewerExperience';
import { getCallback } from '@/services';
import { DEFAULT_EXPERIENCE_VALUES } from '@/store/useResumeExperienceStore';
import { describeResumeExperienceAction } from '../../Aside/AsideFormExperience/actions/describe-resume-experience';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import ErrorMessage from '../../ErrorMessage';

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

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.experience) {
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
