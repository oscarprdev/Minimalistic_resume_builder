'use client';

import { Form } from '@/components/ui/form';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { IconLoader2 } from '@tabler/icons-react';
import FormInput from '../../forms/FormInput';
import { LanguagesFormState } from './utils';
import ResumeLanguageList from './ResumeLanguageList';

interface ResumeLanguagesFormPresentationProps {
	handleChange: (form: UseFormReturn<LanguagesFormState>, name: Path<LanguagesFormState>, value: any) => void;
	form: UseFormReturn<LanguagesFormState, any, undefined>;
	formErrors: FieldErrors<LanguagesFormState>;
	loading: boolean;
}

const ResumeLanguagesFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeLanguagesFormPresentationProps) => {
	return (
		<Form {...form}>
			<form className='relative group border border-transparent border-dashed rounded-lg mt-2 pt-3 pl-8 pb-5 pr-3 hover:border-purple_100 duration-300 '>
				{loading && (
					<span className='absolute top-3 right-3 *:text-purple_100 animate-spin place-items-center'>
						<IconLoader2 size={20} />
					</span>
				)}
				<p className='absolute -top-3 left-2 bg-white px-2 text-purple_100 text-sm opacity-0 group-hover:opacity-100 transition duration-300'>
					Languages
				</p>
				<FormInput
					form={form}
					name={'title'}
					kind={'subtitle'}
					handleChange={handleChange}
				/>
				<ResumeLanguageList
					form={form}
					errors={
						formErrors.languageList && Array.isArray(formErrors.languageList)
							? formErrors.languageList.map((languageError) => languageError?.message)
							: []
					}
					handleChange={handleChange}
				/>
			</form>
		</Form>
	);
};

export default ResumeLanguagesFormPresentation;
