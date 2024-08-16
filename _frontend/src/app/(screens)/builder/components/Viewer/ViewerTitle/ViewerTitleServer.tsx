'use server';

import { isLeft } from '@/lib/either';
import { getCallback } from '@/services';
import ViewerTitle from './ViewerTitle';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { DEFAULT_INFO_VALUES } from '@/store/useResumeInfoStore';
import { listResumeAction } from '@/app/actions/resume/list-resume.action';
import ErrorMessage from '../../ErrorMessage';

interface ViewerTitleServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerTitleServer = async ({ userId, resumeId }: ViewerTitleServerProps) => {
	const listResumeActionResponse = await listResumeAction({
		userId: userId,
		getCallback,
	});
	if (isLeft(listResumeActionResponse)) {
		return <ErrorMessage />;
	}

	const allResumesData = listResumeActionResponse.right.map((resume) => ({ id: resume.id, theme: resume.theme }));
	const currentResumeIndex = allResumesData.findIndex((data) => data.id === resumeId);

	if (!resumeId) {
		return (
			<ViewerTitle
				resumeTitle={DEFAULT_INFO_VALUES.title}
				allResumesData={allResumesData}
				index={currentResumeIndex}
			/>
		);
	}

	const response = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return (
			<ViewerTitle
				resumeTitle={DEFAULT_INFO_VALUES.title}
				error={response.left}
				allResumesData={allResumesData}
				index={currentResumeIndex}
			/>
		);
	}

	return (
		<ViewerTitle
			resumeTitle={response.right.title}
			allResumesData={allResumesData}
			index={currentResumeIndex}
		/>
	);
};

export default ViewerTitleServer;
