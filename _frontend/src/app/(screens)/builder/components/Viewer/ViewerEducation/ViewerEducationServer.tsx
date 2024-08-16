'use server';

import { isLeft } from '@/lib/either';
import ViewerEducation from './ViewerEducation';
import { getCallback } from '@/services';
import { DEFAULT_EDUCATION_VALUES } from '@/store/useResumeEducationStore';
import { describeResumeEducationAction } from '../../Aside/AsideFormEducation/actions/describe-resume-education';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';

interface ViewerEducationServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerEducationServer = async ({ userId, resumeId }: ViewerEducationServerProps) => {
	if (!resumeId) {
		return (
			<ViewerEducation
				title={DEFAULT_EDUCATION_VALUES.title}
				educationList={DEFAULT_EDUCATION_VALUES.educationList}
				userId={userId}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.education) {
		return (
			<ViewerEducation
				title={DEFAULT_EDUCATION_VALUES.title}
				educationList={DEFAULT_EDUCATION_VALUES.educationList}
				userId={userId}
			/>
		);
	}

	const response = await describeResumeEducationAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return (
			<ViewerEducation
				title={DEFAULT_EDUCATION_VALUES.title}
				educationList={DEFAULT_EDUCATION_VALUES.educationList}
				error={response.left}
				userId={userId}
			/>
		);
	}

	return (
		<ViewerEducation
			title={response.right.title}
			educationList={response.right.educationList}
			isSectionHidden={response.right.isHidden}
			userId={userId}
		/>
	);
};

export default ViewerEducationServer;
