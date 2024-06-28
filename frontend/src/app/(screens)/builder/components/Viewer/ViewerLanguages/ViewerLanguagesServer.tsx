'use server';

import { isLeft } from '@/lib/either';
import ViewerLanguages from './ViewerLanguages';
import { getCallback } from '@/services';
import { DEFAULT_LANGUAGES_VALUES } from '@/store/useResumeLanguagesStore';
import { describeResumeLanguagesAction } from '../../Aside/AsideFormLanguages/actions/describe-resume-languages';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';

interface ViewerLanguagesServerProps {
	userId: string;
	resumeId: string | null;
}

const ViewerLanguagesServer = async ({ userId, resumeId }: ViewerLanguagesServerProps) => {
	if (!resumeId) {
		return (
			<ViewerLanguages
				title={DEFAULT_LANGUAGES_VALUES.title}
				languageList={DEFAULT_LANGUAGES_VALUES.languageList}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.languages) {
		return (
			<ViewerLanguages
				title={DEFAULT_LANGUAGES_VALUES.title}
				languageList={DEFAULT_LANGUAGES_VALUES.languageList}
			/>
		);
	}

	const response = await describeResumeLanguagesAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return (
			<ViewerLanguages
				title={DEFAULT_LANGUAGES_VALUES.title}
				languageList={DEFAULT_LANGUAGES_VALUES.languageList}
				error={response.left}
			/>
		);
	}

	return (
		<ViewerLanguages
			title={response.right.title}
			languageList={response.right.languageList}
			isSectionHidden={response.right.isHidden}
		/>
	);
};

export default ViewerLanguagesServer;
