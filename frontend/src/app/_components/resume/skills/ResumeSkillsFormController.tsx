'use client';

import { Skills } from '@/types';
import { useFormMutation } from '@/hooks/useFormMutation/useFormMutation';
import { SkillsFormState, skillsFormSchema } from './utils';
import { updateSkills } from '@/app/actions/resume/sections/skills/update-skills';
import ResumeSkillsFormPresentation from './ResumeSkillsFormPresentation';

export interface ResumeSkillsFormProps {
	userId: string;
	resumeId: string;
	defaultValues: Skills;
}

const ResumeSkillsFormController = ({ userId, resumeId, defaultValues }: ResumeSkillsFormProps) => {
	const { form, handleChange, loading, errors } = useFormMutation<SkillsFormState>({
		formSchema: skillsFormSchema,
		defaultValues,
		errorMessage: 'Updating skills resume section has failed',
		info: { userId, resumeId },
		action: updateSkills,
	});

	return (
		<ResumeSkillsFormPresentation
			handleChange={handleChange}
			form={form}
			formErrors={errors}
			loading={loading}
		/>
	);
};

export default ResumeSkillsFormController;
