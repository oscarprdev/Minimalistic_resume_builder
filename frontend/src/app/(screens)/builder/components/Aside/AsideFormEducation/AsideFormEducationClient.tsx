'use client';

import { useResumeEducationStore } from '@/store/useResumeEducationStore';
import AsideFormEducation from './AsideFormEducation';
import { right } from '@/lib/either';
import { FormEducationValues } from './schema-validations';

const AsideFormEducationClient = () => {
	const educationStore = useResumeEducationStore();

	const handleClientSubmit = async ({ title, educationList }: FormEducationValues) => {
		educationStore.updateEducation({ title, educationList });

		return right('');
	};

	return <AsideFormEducation handleSubmit={handleClientSubmit} />;
};

export default AsideFormEducationClient;
