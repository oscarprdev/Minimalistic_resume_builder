'use server';

import { postCallback, getCallback } from '@/lib/service.utils';
import AsideFormEducation from './AsideFormEducation';
import { z } from 'zod';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions';
import { describeResumeEducationAction, updateResumeEducationAction } from '@/app/builder/components/Aside/AsideFormEducation/actions';
import { asideFormEducationSchema } from './schema-validations';

interface AsideFormEducationServerProps {
	userId: string;
	resumeId?: string | null;
}

const AsideFormEducationServer = async ({ userId, resumeId }: AsideFormEducationServerProps) => {
	const handleServerSubmit = async (values: z.infer<typeof asideFormEducationSchema>): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeEducationAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, educationList: values.educationList },
			postCallback,
		});
	};

	if (!resumeId) {
		return <AsideFormEducation handleSubmit={handleServerSubmit} />;
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.education) {
		return <AsideFormEducation handleSubmit={handleServerSubmit} />;
	}

	const response = await describeResumeEducationAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormEducation
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
		/>
	);
};

export default AsideFormEducationServer;
