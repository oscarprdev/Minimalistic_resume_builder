'use client';

import { Education } from '@/types';
import { useFormMutation } from '@/app/hooks/useFormMutation/useFormMutation';
import ResumeEducationFormPresentation from './ResumeEducationFormPresentation';
import { updateEducation } from '@/app/actions/resume/sections/education/update-education';
import { EducationFormState, educationFormSchema } from './utils';

export interface ResumeEducationFormProps {
	userId: string;
	resumeId: string;
	defaultValues: Education;
}

const ResumeEducationFormController = ({ userId, resumeId, defaultValues }: ResumeEducationFormProps) => {
	const { form, handleChange, loading, errors } = useFormMutation<EducationFormState>({
		formSchema: educationFormSchema,
		defaultValues,
		errorMessage: 'Updating education resume section has failed',
		info: { userId, resumeId },
		action: updateEducation,
	});

	return (
		<ResumeEducationFormPresentation
			handleChange={handleChange}
			form={form}
			formErrors={errors}
			loading={loading}
		/>
	);
};

export default ResumeEducationFormController;
