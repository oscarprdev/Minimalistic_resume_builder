'use server';

import { postCallback, getCallback } from '@/lib/service.utils';
import AsideFormLanguages from './AsideFormLanguages';
import { z } from 'zod';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions';
import { describeResumeLanguagesAction, updateResumeLanguagesAction } from '@/app/builder/components/Aside/AsideFormLanguages/actions';
import { asideFormLanguagesSchema } from './schema-validations';

interface AsideFormLanguagesServerProps {
	userId: string;
	resumeId?: string | null;
}

const AsideFormLanguagesServer = async ({ userId, resumeId }: AsideFormLanguagesServerProps) => {
	const handleServerSubmit = async (values: z.infer<typeof asideFormLanguagesSchema>): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeLanguagesAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, languageList: values.languageList },
			postCallback,
		});
	};

	if (!resumeId) {
		return <AsideFormLanguages handleSubmit={handleServerSubmit} />;
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.languages) {
		return <AsideFormLanguages handleSubmit={handleServerSubmit} />;
	}

	const response = await describeResumeLanguagesAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormLanguages
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
		/>
	);
};

export default AsideFormLanguagesServer;
