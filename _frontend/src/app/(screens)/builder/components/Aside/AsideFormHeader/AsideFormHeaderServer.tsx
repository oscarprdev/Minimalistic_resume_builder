'use server';

import { postCallback, getCallback } from '@/services';
import AsideFormHeader from './AsideFormHeader';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { useCallback } from 'react';
import { updateResumeHeaderAction } from './actions/update-resume-header';
import { uploadImageAction } from '../../../../../actions/resume/upload-image';
import { removeImageAction } from '../../../../../actions/resume/remove-image';
import { describeResumeHeaderAction } from './actions/describe-resume-header';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { ResumeHeaderDefaultValues } from '@/store/useResumeHeaderStore';
import { FormHeaderValues } from './schema-validations';
import { updateResumeImageAction } from './actions/update-header-image';

interface AsideFormHeaderServerProps {
	userId: string;
	resumeId?: string | null;
}

const DEFAULT_HEADER_VALUES: ResumeHeaderDefaultValues = {
	name: '',
	job: '',
	location: '',
	email: '',
	phone: '',
	links: [],
	isHidden: false,
};

const AsideFormHeaderServer = async ({ userId, resumeId }: AsideFormHeaderServerProps) => {
	const defaultResumeId = crypto.randomUUID().toString();

	const handleServerSubmit = useCallback(
		async (values: FormHeaderValues): Promise<Either<string, string>> => {
			'use server';
			return await updateResumeHeaderAction({
				userId,
				resumeId: resumeId || defaultResumeId,
				payload: { ...values },
				postCallback,
			});
		},
		[defaultResumeId, resumeId, userId]
	);

	const updateImage = useCallback(
		async (formData: FormData) => {
			'use server';
			return await updateResumeImageAction({ resumeId: resumeId || defaultResumeId, userId, payload: { formData } });
		},
		[defaultResumeId, resumeId, userId]
	);

	const removeImage = useCallback(async () => {
		'use server';
		return await removeImageAction({ resumeId: resumeId || defaultResumeId, keyword: 'header' });
	}, [defaultResumeId, resumeId]);

	if (!resumeId) {
		return (
			<AsideFormHeader
				handleSubmit={handleServerSubmit}
				updateImage={updateImage}
				removeImage={removeImage}
				defaultValues={DEFAULT_HEADER_VALUES}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.header) {
		return (
			<AsideFormHeader
				handleSubmit={handleServerSubmit}
				updateImage={updateImage}
				removeImage={removeImage}
				defaultValues={DEFAULT_HEADER_VALUES}
			/>
		);
	}

	const response = await describeResumeHeaderAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormHeader
			defaultValues={response.right}
			userId={userId}
			resumeId={resumeId}
			handleSubmit={handleServerSubmit}
			updateImage={updateImage}
			removeImage={removeImage}
		/>
	);
};

export default AsideFormHeaderServer;
