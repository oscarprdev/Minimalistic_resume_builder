'use client';

import { Form } from '@/components/ui/form';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { FORM_FIELDS, HeaderFormState } from './utils';
import ResumeHeaderLinks from './ResumeHeaderLinks';
import FormInput from '../../forms/FormInput';
import FormTextarea from '../../forms/FormTextarea';
import ResumeHeaderImageController from './ResumeHeaderImageController';
import { IconLoader2 } from '@tabler/icons-react';

interface ResumeHeaderFormPresentationProps {
	handleChange: (form: UseFormReturn<HeaderFormState>, name: Path<HeaderFormState>, value: any) => void;
	form: UseFormReturn<HeaderFormState, any, undefined>;
	formErrors: FieldErrors<HeaderFormState>;
	loading: boolean;
}

const ResumeHeaderFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeHeaderFormPresentationProps) => {
	return (
		<Form {...form}>
			<form className='relative group border border-transparent border-dashed rounded-lg mt-2 pt-3 pl-8 pb-3 pr-3 hover:border-purple_100 duration-300'>
				{loading && (
					<span className='absolute top-3 right-3 *:text-purple_100 animate-spin place-items-center'>
						<IconLoader2 size={20} />
					</span>
				)}
				<p className='absolute -top-3 left-2 bg-white px-2 text-purple_100 text-sm opacity-0 group-hover:opacity-100 transition duration-300'>
					Header
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
							maxLength={80}
							handleChange={handleChange}
							onHeader
						/>
					)
				)}
				<ResumeHeaderImageController
					imageUrl={form.getValues('image')}
					form={form}
					name='image'
					handleChange={handleChange}
				/>
				<ResumeHeaderLinks
					form={form}
					handleChange={handleChange}
					errors={formErrors.links && Array.isArray(formErrors.links) ? formErrors.links.map((linkError) => linkError?.message) : []}
				/>
			</form>
		</Form>
	);
};

export default ResumeHeaderFormPresentation;
