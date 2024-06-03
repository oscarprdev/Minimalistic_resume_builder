'use client';

import { FieldErrors, Path, UseFormReturn } from 'react-hook-form';
import FormInput from '../../forms/FormInput';
import { LanguagesFormState } from './utils';
import ResumeLanguageList from './ResumeLanguageList';
import ErrorMessage from '../common/ErrorMessage';
import SectionHeader from '../common/SectionHeader';
import SectionWrapper from '../common/SectionWrapper';

interface ResumeLanguagesFormPresentationProps {
	handleChange: (form: UseFormReturn<LanguagesFormState>, name: Path<LanguagesFormState>, value: any) => void;
	form: UseFormReturn<LanguagesFormState, any, undefined>;
	formErrors: FieldErrors<LanguagesFormState>;
	loading: boolean;
}

const ResumeLanguagesFormPresentation = ({ handleChange, form, formErrors, loading }: ResumeLanguagesFormPresentationProps) => {
	return (
		<SectionWrapper form={form}>
			<SectionHeader
				isLoading={loading}
				title='Languages'
			/>
			<FormInput
				form={form}
				name={'title'}
				kind={'subtitle'}
				handleChange={handleChange}
			/>
			<ResumeLanguageList
				form={form}
				handleChange={handleChange}
			/>
			<ErrorMessage
				isVisible={Boolean(formErrors.languageList)}
				message={formErrors.languageList?.message}
			/>
		</SectionWrapper>
	);
};

export default ResumeLanguagesFormPresentation;
