'use server';

import { isLeft } from '@/lib/either';
import { getCallback } from '@/services';
import ViewerTitle from './ViewerTitle';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { DEFAULT_INFO_VALUES } from '@/store/useResumeInfoStore';

interface ViewerTitleServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerTitleServer = async ({ userId, resumeId }: ViewerTitleServerProps) => {
	if (!resumeId) {
		return <ViewerTitle resumeTitle={DEFAULT_INFO_VALUES.title} />;
	}

	const response = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return (
			<ViewerTitle
				resumeTitle={DEFAULT_INFO_VALUES.title}
				error={response.left}
			/>
		);
	}

	return <ViewerTitle resumeTitle={response.right.title} />;
};

export default ViewerTitleServer;
