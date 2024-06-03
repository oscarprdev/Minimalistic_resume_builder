'use client';

import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import FormInput from '../../forms/FormInput';
import { SkillsFormState } from './utils';
import ResumeSkillList from './ResumeSkillList';
import ErrorMessage from '../common/ErrorMessage';
import SectionHeader from '../common/SectionHeader';
import SectionWrapper from '../common/SectionWrapper';

interface ResumeSkillsFormPresentationProps {
	handleChange: (form: UseFormReturn<SkillsFormState>, name: Path<SkillsFormState>, value: any) => void;
	form: UseFormReturn<SkillsFormState, any, undefined>;
	formErrors: FieldErrors<SkillsFormState>;
	loading: boolean;
}

const ResumeSkillsFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeSkillsFormPresentationProps) => {
	return (
		<SectionWrapper form={form}>
			<SectionHeader
				isLoading={loading}
				title='Skills'
			/>
			<FormInput
				form={form}
				name={'title'}
				kind={'subtitle'}
				handleChange={handleChange}
			/>
			<ResumeSkillList
				form={form}
				handleChange={handleChange}
			/>
			<ErrorMessage
				isVisible={Boolean(formErrors.skillList)}
				message={formErrors.skillList?.message}
			/>
		</SectionWrapper>
	);
};

export default ResumeSkillsFormPresentation;
