'use server';

import { isLeft } from '@/lib/either';
import ViewerEducation from './ViewerEducation';
import { getCallback } from '@/lib/service.utils';
import { DEFAULT_EDUCATION_VALUES } from '@/store/useResumeEducationStore';
import { describeResumeEducationAction } from '../../Aside/AsideFormEducation/actions';

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
			/>
		);
	}

	return (
		<ViewerEducation
			title={response.right.title}
			educationList={response.right.educationList}
		/>
	);
};

export default ViewerEducationServer;
