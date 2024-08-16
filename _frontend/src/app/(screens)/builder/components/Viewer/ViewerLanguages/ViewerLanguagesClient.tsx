'use client';

import ViewerLanguages from './ViewerLanguages';
import { useResumeLanguagesStore } from '@/store/useResumeLanguagesStore';

const ViewerLanguagesClient = () => {
	const languagesStore = useResumeLanguagesStore();

	return (
		<ViewerLanguages
			title={languagesStore.resumeLanguages.title}
			languageList={languagesStore.resumeLanguages.languageList}
		/>
	);
};

export default ViewerLanguagesClient;
