'use server';

import { postCallback, getCallback } from '@/services';
import AsideFormSkills from './AsideFormSkills';
import { Either, isLeft } from '@/lib/either';
import ErrorMessage from '../../ErrorMessage';
import { describeResumeAction } from '@/app/actions/resume/describe-resume.action';
import { FormSkillsValues } from './schema-validations';
import { updateResumeSkillsAction } from './actions/update-resume-skills';
import { describeResumeSkillsAction } from './actions/describe-resume-skills';
import { ResumeSkillsDefaultValues } from '@/store/useResumeSkillsStore';

interface AsideFormSkillsServerProps {
	userId: string;
	resumeId?: string | null;
}

const DEFAULT_SKILLS_VALUES: ResumeSkillsDefaultValues = {
	title: '',
	isHidden: false,
	skillList: [],
};

const AsideFormSkillsServer = async ({ userId, resumeId }: AsideFormSkillsServerProps) => {
	const handleServerSubmit = async (values: FormSkillsValues): Promise<Either<string, string>> => {
		'use server';
		return await updateResumeSkillsAction({
			userId,
			resumeId: resumeId || crypto.randomUUID().toString(),
			payload: { title: values.title, isHidden: values.isHidden, skillList: values.skillList },
			postCallback,
		});
	};

	if (!resumeId) {
		return (
			<AsideFormSkills
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_SKILLS_VALUES}
			/>
		);
	}

	const describeResumeActionResponse = await describeResumeAction({ userId, resumeId, getCallback });
	if (isLeft(describeResumeActionResponse)) {
		return <ErrorMessage />;
	}

	if (!describeResumeActionResponse.right.skills) {
		return (
			<AsideFormSkills
				handleSubmit={handleServerSubmit}
				defaultValues={DEFAULT_SKILLS_VALUES}
			/>
		);
	}

	const response = await describeResumeSkillsAction({ userId, resumeId, getCallback });
	if (isLeft(response)) {
		return <ErrorMessage />;
	}

	return (
		<AsideFormSkills
			defaultValues={response.right}
			handleSubmit={handleServerSubmit}
			userId={userId}
			resumeId={resumeId}
		/>
	);
};

export default AsideFormSkillsServer;
