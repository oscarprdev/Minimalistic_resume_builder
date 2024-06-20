'use client';

import { useResumeLanguagesStore } from '@/store/useResumeLanguagesStore';
import { z } from 'zod';
import AsideFormLanguages from './AsideFormLanguages';
import { right } from '@/lib/either';
import { asideFormLanguagesSchema } from './schema-validations';

const AsideFormLanguagesClient = () => {
	const languagesStore = useResumeLanguagesStore();

	const handleClientSubmit = async ({ title, languageList }: z.infer<typeof asideFormLanguagesSchema>) => {
		languagesStore.updateLanguages({ title, languageList });

		return right('');
	};

	return <AsideFormLanguages handleSubmit={handleClientSubmit} />;
};

export default AsideFormLanguagesClient;
