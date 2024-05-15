'use client';

import { HeaderFormState, headerFormSchema } from './utils';
import ResumeHeaderFormPresentation from './ResumeHeaderFormPresentation';
import { updateHeader } from '@/app/actions/resume/sections/header/update-header';
import { Header } from '@/types';
import { useFormMutation } from '@/app/hooks/useFormMutation/useFormMutation';

export interface ResumeHeaderFormProps {
	userId: string;
	resumeId: string;
	defaultValues: Header;
}

const ResumeHeaderFormController = ({ userId, resumeId, defaultValues }: ResumeHeaderFormProps) => {
	const { form, onSubmit, loading, errors } = useFormMutation<HeaderFormState>({
		formSchema: headerFormSchema,
		defaultValues,
		errorMessage: 'Updating header resume section has failed',
		info: { userId, resumeId },
		action: updateHeader,
	});

	return (
		<ResumeHeaderFormPresentation
			onSubmit={onSubmit}
			form={form}
			formErrors={errors}
			loading={loading}
		/>
	);
};

export default ResumeHeaderFormController;
