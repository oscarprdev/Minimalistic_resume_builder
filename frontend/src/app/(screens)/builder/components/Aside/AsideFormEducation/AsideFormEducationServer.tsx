'use server';

import { postCallback, getCallback } from '@/services';
import AsideFormEducation from './AsideFormEducation';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { FormEducationValues } from './schema-validations';
import { updateResumeEducationAction } from './actions/update-resume-education';
import { describeResumeEducationAction } from './actions/describe-resume-education';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { ResumeEducationDefaultValues } from '@/store/useResumeEducationStore';

interface AsideFormEducationServerProps {
	userId: string;
	resumeId?: string | null;
}

const DEFAULT_EDUCATION_VALUES: ResumeEducationDefaultValues = {
	title: '',
	isHidden: false,
	educationList: [],
};

const AsideFormEducationServer = async ({ userId, resumeId }: AsideFormEducationServerProps) => {
	const handleServerSubmit = async (values: FormEducationValues): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeEducationAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, isHidden: values.isHidden, educationList: values.educationList },
			postCallback,
		});
	};

	if (!resumeId) {
		return (
			<AsideFormEducation
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_EDUCATION_VALUES}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.education) {
		return (
			<AsideFormEducation
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_EDUCATION_VALUES}
			/>
		);
	}

	const response = await describeResumeEducationAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormEducation
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
			userId={userId}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormEducationServer;
