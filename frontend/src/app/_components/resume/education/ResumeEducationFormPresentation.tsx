'use client';

import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import { EducationFormState } from './utils';
import FormInput from '../../forms/FormInput';
import ResumeEducationSchools from './ResumeEducationSchools';
import ErrorMessage from '../common/ErrorMessage';
import SectionHeader from '../common/SectionHeader';
import SectionWrapper from '../common/SectionWrapper';

interface ResumeEducationFormPresentationProps {
	handleChange: (form: UseFormReturn<EducationFormState>, name: Path<EducationFormState>, value: any) => void;
	form: UseFormReturn<EducationFormState, any, undefined>;
	formErrors: FieldErrors<EducationFormState>;
	loading: boolean;
}

const ResumeEducationFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeEducationFormPresentationProps) => {
	return (
		<SectionWrapper form={form}>
			<SectionHeader
				isLoading={loading}
				title='Education'
			/>
			<FormInput
				form={form}
				name={'title'}
				kind={'sectionTitle'}
				handleChange={handleChange}
			/>
			<ResumeEducationSchools
				form={form}
				handleChange={handleChange}
			/>
			<ErrorMessage
				isVisible={Boolean(formErrors.educationList)}
				message={formErrors.educationList?.message}
			/>
		</SectionWrapper>
	);
};

export default ResumeEducationFormPresentation;
