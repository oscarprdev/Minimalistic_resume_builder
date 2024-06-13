'use client';

import { Languages } from '@/types';
import { useFormMutation } from '@/hooks/useFormMutation/useFormMutation';
import { LanguagesFormState, languagesFormSchema } from './utils';
import { updateLanguages } from '@/app/actions/resume/sections/languages/update-languages';
import ResumeLanguagesFormPresentation from './ResumeLanguagesFormPresentation';

export interface ResumeLanguagesFormProps {
	userId: string;
	resumeId: string;
	defaultValues: Languages;
}

const ResumeLanguagesFormController = ({ userId, resumeId, defaultValues }: ResumeLanguagesFormProps) => {
	const { form, handleChange, loading, errors } = useFormMutation<LanguagesFormState>({
		formSchema: languagesFormSchema,
		defaultValues,
		errorMessage: 'Updating languages resume section has failed',
		info: { userId, resumeId },
		action: updateLanguages,
	});

	return (
		<ResumeLanguagesFormPresentation
			handleChange={handleChange}
			form={form}
			formErrors={errors}
			loading={loading}
		/>
	);
};

export default ResumeLanguagesFormController;
