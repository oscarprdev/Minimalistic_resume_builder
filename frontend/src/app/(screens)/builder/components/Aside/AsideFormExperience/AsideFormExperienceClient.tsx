'use client';

import { useResumeExperienceStore } from '@/store/useResumeExperienceStore';
import AsideFormExperience from './AsideFormExperience';
import { right } from '@/lib/either';
import { FormExperienceValues } from './schema-validations';

const AsideFormExperienceClient = () => {
	const experienceStore = useResumeExperienceStore();

	const handleClientSubmit = async ({ title, jobList, isHidden }: FormExperienceValues) => {
		experienceStore.updateExperience({ title, jobList, isHidden });

		return right('');
	};

	return <AsideFormExperience handleSubmit={handleClientSubmit} />;
};

export default AsideFormExperienceClient;
