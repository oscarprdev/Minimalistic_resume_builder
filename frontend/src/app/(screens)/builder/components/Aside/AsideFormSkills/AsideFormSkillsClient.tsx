'use client';

import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import AsideFormSkills from './AsideFormSkills';
import { right } from '@/lib/either';
import { FormSkillsValues } from './schema-validations';

const AsideFormSkillsClient = () => {
	const skillsStore = useResumeSkillsStore();

	const handleClientSubmit = async ({ title, skillList, isHidden }: FormSkillsValues) => {
		skillsStore.updateSkills({ title, skillList, isHidden });

		return right('');
	};

	return <AsideFormSkills handleSubmit={handleClientSubmit} />;
};

export default AsideFormSkillsClient;
