'use client';

import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import { z } from 'zod';
import AsideFormExperience from './AsideFormExperience';
import { right } from '@/lib/either';
import { asideFormExperienceSchema } from './schema-validations';

const AsideFormExperienceClient = () => {
	const experienceStore = useResumeExperienceStore();

	const handleClientSubmit = async ({ title, jobList }: z.infer<typeof asideFormExperienceSchema>) => {
		experienceStore.updateExperience({ title, jobList });

		return right('');
	};

	return <AsideFormExperience handleSubmit={handleClientSubmit} />;
};

export default AsideFormExperienceClient;
