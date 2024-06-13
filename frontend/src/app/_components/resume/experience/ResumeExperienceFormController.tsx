'use client';

import ResumeExperienceFormPresentation from './ResumeExperienceFormPresentation';
import { Experience } from '@/types';
import { useFormMutation } from '@/hooks/useFormMutation/useFormMutation';
import { ExperienceFormState, experienceFormSchema } from './utils';
import { updateExperience } from '@/app/actions/resume/sections/experience/update-experience';

export interface ResumeExperienceFormProps {
	userId: string;
	resumeId: string;
	defaultValues: Experience;
}

const ResumeExperienceFormController = ({ userId, resumeId, defaultValues }: ResumeExperienceFormProps) => {
	const { form, handleChange, loading, errors } = useFormMutation<ExperienceFormState>({
		formSchema: experienceFormSchema,
		defaultValues,
		errorMessage: 'Updating experience resume section has failed',
		info: { userId, resumeId },
		action: updateExperience,
	});

	return (
		<ResumeExperienceFormPresentation
			handleChange={handleChange}
			form={form}
			formErrors={errors}
			loading={loading}
		/>
	);
};

export default ResumeExperienceFormController;
