'use server';

import { postCallback, getCallback } from '@/services';
import AsideFormHeader, { asideFormHeaderSchema } from './AsideFormHeader';
import { z } from 'zod';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { useCallback } from 'react';
import { updateResumeHeaderAction } from './actions/update-resume-header';
import { uploadImageAction } from './actions/upload-image';
import { removeImageAction } from './actions/remove-image';
import { describeResumeHeaderAction } from './actions/describe-resume-header';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { ResumeHeaderDefaultValues } from '@/store/useResumeHeaderStore';

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
};

const AsideFormHeaderServer = async ({ userId, resumeId }: AsideFormHeaderServerProps) => {
	const defaultResumeId = crypto.randomUUID().toString();

	const handleServerSubmit = useCallback(async (values: z.infer<typeof asideFormHeaderSchema>): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeHeaderAction({
			userId,
			resumeId: resumeId || defaultResumeId,
			payload: { ...values },
			postCallback,
		});
	}, []);

	const updateImage = useCallback(async (formData: FormData) => {
		'use server';
		return await uploadImageAction({ formData, userId, resumeId: resumeId || defaultResumeId });
	}, []);

	const removeImage = useCallback(async () => {
		'use server';
		return await removeImageAction({ resumeId: resumeId || defaultResumeId });
	}, []);

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
			handleSubmit={handleServerSubmit}
			updateImage={updateImage}
			removeImage={removeImage}
		/>
	);
};

export default AsideFormHeaderServer;
