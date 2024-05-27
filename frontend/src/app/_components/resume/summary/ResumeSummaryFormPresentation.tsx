'use client';

import { Form } from '@/components/ui/form';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { FORM_FIELDS, SummaryFormState } from './utils';
import FormInput from '../../forms/FormInput';
import FormTextarea from '../../forms/FormTextarea';

interface ResumeSummaryFormPresentationProps {
	handleChange: (form: UseFormReturn<SummaryFormState>, name: Path<SummaryFormState>, value: any) => void;
	form: UseFormReturn<SummaryFormState, any, undefined>;
	formErrors: FieldErrors<SummaryFormState>;
	loading: boolean;
}

const ResumeSummaryFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeSummaryFormPresentationProps) => {
	return (
		<Form {...form}>
			<form className='relative group border border-transparent border-dashed rounded-lg mt-4 pt-1 pl-8 pb-3 pr-3 hover:border-purple_100 duration-300'>
				<p className='absolute -top-3 left-2 bg-white px-2 text-purple_100 text-sm opacity-0 group-hover:opacity-100 transition duration-300'>
					Summary
				</p>
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
			</form>
		</Form>
	);
};

export default ResumeSummaryFormPresentation;
