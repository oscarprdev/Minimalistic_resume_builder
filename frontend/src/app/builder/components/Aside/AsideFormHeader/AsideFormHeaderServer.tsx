'use server';

import { postCallback, getCallback } from '@/lib/service.utils';
import AsideFormHeader, { asideFormHeaderSchema } from './AsideFormHeader';
import { z } from 'zod';
import { updateResumeHeaderAction } from '@/app/builder/actions/update-resume-header';
import { Either, isLeft, left, right } from '@/lib/either';
import { describeResumeHeaderAction } from '@/app/builder/actions/describe-resume-header';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { ChangeEvent, useCallback } from 'react';
import { uploadImage } from '@/app/builder/actions/upload-image';

interface AsideFormHeaderServerProps {
	userId: string;
	resumeId?: string | null;
}

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
		return await uploadImage({ formData, userId, resumeId: resumeId || defaultResumeId });
	}, []);

	if (!resumeId) {
		return (
			<AsideFormHeader
				handleSubmit={handleServerSubmit}
				updateImage={updateImage}
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
		/>
	);
};

export default AsideFormHeaderServer;
