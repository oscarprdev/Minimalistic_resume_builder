'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { HeaderFormState } from './utils';
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
				<FormInput
					form={form}
					name='name'
					kind='title'
					handleChange={handleChange}
				/>
				<FormInput
					form={form}
					name='job'
					kind='subtitle'
					handleChange={handleChange}
				/>
				<FormInput
					form={form}
					name='location'
					kind='text'
					handleChange={handleChange}
				/>
				<FormInput
					form={form}
					name='phone'
					kind='label'
					handleChange={handleChange}
				/>
				<FormInput
					form={form}
					name='email'
					kind='label'
					handleChange={handleChange}
				/>
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
