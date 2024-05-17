'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { FORM_FIELDS, HeaderFormState } from './utils';
import ResumeHeaderLinks from './ResumeHeaderLinks';
import FormInput from '../forms/FormInput';

interface ResumeHeaderFormPresentationProps {
	handleChange: (form: UseFormReturn<HeaderFormState>, name: Path<HeaderFormState>, value: any) => void;
	form: UseFormReturn<HeaderFormState, any, undefined>;
	formErrors: FieldErrors<HeaderFormState>;
	loading: boolean;
}

const ResumeHeaderFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeHeaderFormPresentationProps) => {
	return (
		<Form {...form}>
			<form className='group border border-transparent border-dashed rounded-lg p-8 hover:border-purple_100 duration-300'>
				{FORM_FIELDS.map((field) => (
					<FormInput
						key={field.name}
						form={form}
						name={field.name}
						kind={field.kind}
						handleChange={handleChange}
					/>
				))}
				<ResumeHeaderLinks
					control={form.control}
					register={form.register}
					errors={formErrors.links && Array.isArray(formErrors.links) ? formErrors.links.map((linkError) => linkError?.message) : []}
				/>
				<Button
					className='hidden'
					type='submit'>
					{loading ? 'loading' : 'submit'}
				</Button>
			</form>
		</Form>
	);
};

export default ResumeHeaderFormPresentation;
