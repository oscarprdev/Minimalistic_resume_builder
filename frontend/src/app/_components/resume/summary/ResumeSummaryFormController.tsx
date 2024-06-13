'use client';

import ResumeSummaryFormPresentation from './ResumeSummaryFormPresentation';
import { Summary } from '@/types';
import { useFormMutation } from '@/hooks/useFormMutation/useFormMutation';
import { updateSummary } from '@/app/actions/resume/sections/summary/update-summary';
import { SummaryFormState, summaryFormSchema } from './utils';

export interface ResumeSummaryFormProps {
	userId: string;
	resumeId: string;
	defaultValues: Summary;
}

const ResumeSummaryFormController = ({ userId, resumeId, defaultValues }: ResumeSummaryFormProps) => {
	const { form, handleChange, loading, errors } = useFormMutation<SummaryFormState>({
		formSchema: summaryFormSchema,
		defaultValues,
		errorMessage: 'Updating summary resume section has failed',
		info: { userId, resumeId },
		action: updateSummary,
	});

	return (
		<ResumeSummaryFormPresentation
			handleChange={handleChange}
			form={form}
			formErrors={errors}
			loading={loading}
		/>
	);
};

export default ResumeSummaryFormController;
