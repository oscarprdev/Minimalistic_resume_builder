'use client';

import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import AsideFormSkills from './AsideFormSkills';
import { right } from '@/lib/either';
import { FormSkillsValues } from './schema-validations';

const AsideFormSkillsClient = () => {
	const skillsStore = useResumeSkillsStore();

	const handleClientSubmit = async ({ title, skillList }: FormSkillsValues) => {
		skillsStore.updateSkills({ title, skillList });

		return right('');
	};

	return <AsideFormSkills handleSubmit={handleClientSubmit} />;
};

export default AsideFormSkillsClient;
