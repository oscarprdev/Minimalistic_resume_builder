'use server';

import { Either, isLeft } from '@/lib/either';
import AsideFormThemes from './AsideFormThemes';
import { postCallback, getCallback } from '@/services';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { FormThemesDefaultValues, FormThemesValues } from './schema-validations';
import { THEMES } from '../../_utils/themes';
import { updateResumeThemeAction } from './actions/update-theme-resume';
import { redirect } from 'next/navigation';

interface AsideFormThemesServerProps {
	userId?: string;
	resumeId?: string | null;
}

const DEFAULT_THEMES_VALUES: FormThemesDefaultValues = {
	theme: THEMES.DEFAULT,
};

const AsideFormThemesServer = async ({ userId, resumeId }: AsideFormThemesServerProps) => {
	if (!userId) {
		redirect('/builder');
	}

	const handleServerSubmit = async (values: FormThemesValues): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeThemeAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { theme: values.theme },
			postCallback,
		});
	};

	if (!resumeId) {
		return (
			<AsideFormThemes
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_THEMES_VALUES}
			/>
		);
	}

	const response = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormThemes
			defaultValues={{ theme: response.right.theme }}
			handleSubmit={handleServerSubmit}
			userId={userId}
		/>
	);
};

export default AsideFormThemesServer;
