'use client';

import { Form } from '@/components/ui/form';
import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { ExperienceFormState } from './utils';
import FormInput from '../../forms/FormInput';
import ResumeExperienceJobs from './ResumeExperienceJobs';
import { IconLoader2 } from '@tabler/icons-react';

interface ResumeExperienceFormPresentationProps {
	handleChange: (form: UseFormReturn<ExperienceFormState>, name: Path<ExperienceFormState>, value: any) => void;
	form: UseFormReturn<ExperienceFormState, any, undefined>;
	formErrors: FieldErrors<ExperienceFormState>;
	loading: boolean;
}

const ResumeExperienceFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeExperienceFormPresentationProps) => {
	return (
		<Form {...form}>
			<form className='relative group border border-transparent border-dashed rounded-lg mt-2 pt-3 pl-8 pb-5 pr-3 hover:border-purple_100 duration-300 '>
				{loading && (
					<span className='absolute top-3 right-3 *:text-purple_100 animate-spin place-items-center'>
						<IconLoader2 size={20} />
					</span>
				)}
				<p className='absolute -top-3 left-2 bg-white px-2 text-purple_100 text-sm opacity-0 group-hover:opacity-100 transition duration-300'>
					Experience
				</p>
				<FormInput
					form={form}
					name={'title'}
					kind={'sectionTitle'}
					handleChange={handleChange}
				/>
				<ResumeExperienceJobs
					form={form}
					handleChange={handleChange}
					errors={formErrors.jobList && Array.isArray(formErrors.jobList) ? formErrors.jobList.map((jobError) => jobError?.message) : []}
				/>
			</form>
		</Form>
	);
};

export default ResumeExperienceFormPresentation;
