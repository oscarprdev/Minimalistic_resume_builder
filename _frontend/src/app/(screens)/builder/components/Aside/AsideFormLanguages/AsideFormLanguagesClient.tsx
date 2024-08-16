'use client';

import { useResumeLanguagesStore } from '@/store/useResumeLanguagesStore';
import AsideFormLanguages from './AsideFormLanguages';
import { right } from '@/lib/either';
import { FormLanguagesValues } from './schema-validations';

const AsideFormLanguagesClient = () => {
	const languagesStore = useResumeLanguagesStore();

	const handleClientSubmit = async ({ title, languageList, isHidden }: FormLanguagesValues) => {
		languagesStore.updateLanguages({ title, languageList, isHidden });

		return right('');
	};

	return <AsideFormLanguages handleSubmit={handleClientSubmit} />;
};

export default AsideFormLanguagesClient;
