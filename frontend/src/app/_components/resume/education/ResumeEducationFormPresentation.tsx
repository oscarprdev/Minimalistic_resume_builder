'use client';

import { Form } from '@/components/ui/form';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { IconLoader2 } from '@tabler/icons-react';
import { EducationFormState } from './utils';
import FormInput from '../../forms/FormInput';

interface ResumeEducationFormPresentationProps {
	handleChange: (form: UseFormReturn<EducationFormState>, name: Path<EducationFormState>, value: any) => void;
	form: UseFormReturn<EducationFormState, any, undefined>;
	formErrors: FieldErrors<EducationFormState>;
	loading: boolean;
}

const ResumeEducationFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeEducationFormPresentationProps) => {
	return (
		<Form {...form}>
			<form className='relative group border border-transparent border-dashed rounded-lg mt-2 pt-3 pl-8 pb-5 pr-3 hover:border-purple_100 duration-300 '>
				{loading && (
					<span className='absolute top-3 right-3 *:text-purple_100 animate-spin place-items-center'>
						<IconLoader2 size={20} />
					</span>
				)}
				<p className='absolute -top-3 left-2 bg-white px-2 text-purple_100 text-sm opacity-0 group-hover:opacity-100 transition duration-300'>
					Education
				</p>
				<FormInput
					form={form}
					name={'title'}
					kind={'sectionTitle'}
					handleChange={handleChange}
				/>
			</form>
		</Form>
	);
};

export default ResumeEducationFormPresentation;
