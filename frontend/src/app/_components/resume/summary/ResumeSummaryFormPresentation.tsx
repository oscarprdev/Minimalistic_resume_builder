'use client';

import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { FORM_FIELDS, SummaryFormState } from './utils';
import FormInput from '../../forms/FormInput';
import FormTextarea from '../../forms/FormTextarea';
import SectionHeader from '../common/SectionHeader';
import SectionWrapper from '../common/SectionWrapper';

interface ResumeSummaryFormPresentationProps {
	handleChange: (form: UseFormReturn<SummaryFormState>, name: Path<SummaryFormState>, value: any) => void;
	form: UseFormReturn<SummaryFormState, any, undefined>;
	formErrors: FieldErrors<SummaryFormState>;
	loading: boolean;
}

const ResumeSummaryFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeSummaryFormPresentationProps) => {
	return (
		<SectionWrapper form={form}>
			<SectionHeader
				isLoading={loading}
				title='Summary'
			/>
			{FORM_FIELDS.map((field) =>
				field.container === 'input' ? (
					<FormInput
						key={field.name}
						form={form}
						name={field.name}
						kind={field.kind}
						handleChange={handleChange}
					/>
				) : (
					<FormTextarea
						key={field.name}
						form={form}
						name={field.name}
						maxLength={300}
						handleChange={handleChange}
					/>
				)
			)}
		</SectionWrapper>
	);
};

export default ResumeSummaryFormPresentation;
