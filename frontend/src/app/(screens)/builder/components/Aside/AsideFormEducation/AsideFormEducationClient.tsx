'use client';

import { useResumeEducationStore } from '@/store/useResumeEducationStore';
import { z } from 'zod';
import AsideFormEducation from './AsideFormEducation';
import { right } from '@/lib/either';
import { asideFormEducationSchema } from './schema-validations';

const AsideFormEducationClient = () => {
	const educationStore = useResumeEducationStore();

	const handleClientSubmit = async ({ title, educationList }: z.infer<typeof asideFormEducationSchema>) => {
		educationStore.updateEducation({ title, educationList });

		return right('');
	};

	return <AsideFormEducation handleSubmit={handleClientSubmit} />;
};

export default AsideFormEducationClient;
