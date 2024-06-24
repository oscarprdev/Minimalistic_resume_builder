'use server';

import { postCallback, getCallback } from '@/lib/service.utils';
import AsideFormSkills from './AsideFormSkills';
import { z } from 'zod';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { asideFormSkillsSchema } from './schema-validations';
import { updateResumeSkillsAction } from './actions/update-resume-skills';
import { describeResumeSkillsAction } from './actions/describe-resume-skills';

interface AsideFormSkillsServerProps {
	userId: string;
	resumeId?: string | null;
}

const AsideFormSkillsServer = async ({ userId, resumeId }: AsideFormSkillsServerProps) => {
	const handleServerSubmit = async (values: z.infer<typeof asideFormSkillsSchema>): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeSkillsAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, skillList: values.skillList },
			postCallback,
		});
	};

	if (!resumeId) {
		return <AsideFormSkills handleSubmit={handleServerSubmit} />;
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.skills) {
		return <AsideFormSkills handleSubmit={handleServerSubmit} />;
	}

	const response = await describeResumeSkillsAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormSkills
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
		/>
	);
};

export default AsideFormSkillsServer;
