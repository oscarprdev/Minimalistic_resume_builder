'use client';

import { Form } from '@/components/ui/form';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { IconLoader2 } from '@tabler/icons-react';
import FormInput from '../../forms/FormInput';
import { SkillsFormState } from './utils';
import ResumeSkillList from './ResumeSkillList';
import { IconAlertTriangle } from '@tabler/icons-react';

interface ResumeSkillsFormPresentationProps {
	handleChange: (form: UseFormReturn<SkillsFormState>, name: Path<SkillsFormState>, value: any) => void;
	form: UseFormReturn<SkillsFormState, any, undefined>;
	formErrors: FieldErrors<SkillsFormState>;
	loading: boolean;
}

const ResumeSkillsFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeSkillsFormPresentationProps) => {
	return (
		<Form {...form}>
			<form className='relative group border border-transparent border-dashed rounded-lg pt-3 pl-8 pb-5 pr-3 hover:border-purple_100 duration-300 '>
				{loading && (
					<span className='absolute top-3 right-3 *:text-purple_100 animate-spin place-items-center'>
						<IconLoader2 size={20} />
					</span>
				)}
				<p className='absolute -top-3 left-2 bg-white px-2 text-purple_100 text-sm opacity-0 group-hover:opacity-100 transition duration-300'>
					Skills
				</p>
				<FormInput
					form={form}
					name={'title'}
					kind={'subtitle'}
					handleChange={handleChange}
				/>
				{formErrors.skillList && (
					<div className='absolute bottom-0 left-12 flex items-center gap-2 text-red-600'>
						<IconAlertTriangle size={13} />
						<p className='text-xs'>{formErrors.skillList.message}</p>
					</div>
				)}
				<ResumeSkillList
					form={form}
					handleChange={handleChange}
				/>
			</form>
		</Form>
	);
};

export default ResumeSkillsFormPresentation;
