'use server';

import { postCallback, getCallback } from '@/services';
import AsideFormLanguages from './AsideFormLanguages';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { FormLanguagesValues } from './schema-validations';
import { updateResumeLanguagesAction } from './actions/update-resume-languages';
import { describeResumeLanguagesAction } from './actions/describe-resume-languages';
import { ResumeLanguagesDefaultValues } from '@/store/useResumeLanguagesStore';

interface AsideFormLanguagesServerProps {
	userId: string;
	resumeId?: string | null;
}

const DEFAULT_LANGUAGES_VALUES: ResumeLanguagesDefaultValues = {
	title: '',
	languageList: [],
};

const AsideFormLanguagesServer = async ({ userId, resumeId }: AsideFormLanguagesServerProps) => {
	const handleServerSubmit = async (values: FormLanguagesValues): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeLanguagesAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, languageList: values.languageList },
			postCallback,
		});
	};

	if (!resumeId) {
		return (
			<AsideFormLanguages
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_LANGUAGES_VALUES}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.languages) {
		return (
			<AsideFormLanguages
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_LANGUAGES_VALUES}
			/>
		);
	}

	const response = await describeResumeLanguagesAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormLanguages
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
			userId={userId}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormLanguagesServer;
