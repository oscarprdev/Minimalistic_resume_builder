'use client';

import { useResumeSkillsStore } from '@/store/useResumeSkillsStore';
import { z } from 'zod';
import AsideFormSkills from './AsideFormSkills';
import { right } from '@/lib/either';
import { asideFormSkillsSchema } from './schema-validations';

const AsideFormSkillsClient = () => {
	const skillsStore = useResumeSkillsStore();

	const handleClientSubmit = async ({ title, skillList }: z.infer<typeof asideFormSkillsSchema>) => {
		skillsStore.updateSkills({ title, skillList });

		return right('');
	};

	return <AsideFormSkills handleSubmit={handleClientSubmit} />;
};

export default AsideFormSkillsClient;
