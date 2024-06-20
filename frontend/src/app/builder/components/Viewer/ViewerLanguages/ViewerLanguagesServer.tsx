'use server';

import { isLeft } from '@/lib/either';
import ViewerLanguages from './ViewerLanguages';
import { getCallback } from '@/lib/service.utils';
import { DEFAULT_LANGUAGES_VALUES } from '@/store/useResumeLanguagesStore';
import { describeResumeLanguagesAction } from '../../Aside/AsideFormLanguages/actions';

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
		/>
	);
};

export default ViewerLanguagesServer;
