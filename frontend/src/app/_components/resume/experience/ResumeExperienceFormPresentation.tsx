'use client';

import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { ExperienceFormState } from './utils';
import FormInput from '../../forms/FormInput';
import ResumeExperienceJobs from './ResumeExperienceJobs';
import ErrorMessage from '../common/ErrorMessage';
import SectionHeader from '../common/SectionHeader';
import SectionWrapper from '../common/SectionWrapper';

interface ResumeExperienceFormPresentationProps {
	handleChange: (form: UseFormReturn<ExperienceFormState>, name: Path<ExperienceFormState>, value: any) => void;
	form: UseFormReturn<ExperienceFormState, any, undefined>;
	formErrors: FieldErrors<ExperienceFormState>;
	loading: boolean;
}

const ResumeExperienceFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeExperienceFormPresentationProps) => {
	return (
		<SectionWrapper form={form}>
			<SectionHeader
				isLoading={loading}
				title='Experience'
			/>
			<FormInput
				form={form}
				name={'title'}
				kind={'sectionTitle'}
				handleChange={handleChange}
			/>
			<ResumeExperienceJobs
				form={form}
				handleChange={handleChange}
			/>
			<ErrorMessage
				isVisible={Boolean(formErrors.jobList)}
				message={formErrors.jobList?.message}
			/>
		</SectionWrapper>
	);
};

export default ResumeExperienceFormPresentation;
