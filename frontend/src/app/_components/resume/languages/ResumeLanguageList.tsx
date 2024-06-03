'use client';

import { UseFormReturn, Path } from 'react-hook-form';
import FormInput from '../../forms/FormInput';
import { useState } from 'react';
import { Language } from '@/types';
import RemoveItemButton from '../../buttons/RemoveItemButton';
import { LanguagesFormState } from './utils';
import AppendButton from '../common/AppendButton';

interface ResumeLanguageListProps {
	form: UseFormReturn<LanguagesFormState, any, undefined>;
	handleChange: (form: UseFormReturn<LanguagesFormState>, name: Path<LanguagesFormState>, value: any) => void;
}

const LANGUAGE_LIST_NAME = 'languageList';

const DEFAULT_LANGUAGE: Language = {
	id: '',
	name: 'English',
	level: 'Medium',
	certificateLink: '-',
};

const ResumeLanguageList = ({ form, handleChange }: ResumeLanguageListProps) => {
	const [languageList, setLanguageList] = useState<Language[]>(form.getValues(LANGUAGE_LIST_NAME));

	const appendLanguage = (newlanguage: Language) => {
		const updatedLanguage = [...form.getValues(LANGUAGE_LIST_NAME), newlanguage];
		setLanguageList(updatedLanguage);
		handleChange(form, LANGUAGE_LIST_NAME, updatedLanguage);
	};

	const removeLanguage = (index: number) => {
		const updatedLanguage = form.getValues(LANGUAGE_LIST_NAME).filter((_, i) => i !== index);
		setLanguageList(updatedLanguage);
		handleChange(form, LANGUAGE_LIST_NAME, updatedLanguage);
	};

	return (
		<section className='flex items-center gap-1 mt-2 justify-start flex-wrap'>
			{languageList.map((_, index) => (
				<div
					key={_.id}
					className='relative flex items-center'>
					<span className='absolute -top-1 -left-5'>
						<RemoveItemButton
							index={index}
							text={'Remove language'}
							onRemove={() => removeLanguage(index)}
						/>
					</span>

					<div className='flex flex-col gap-1 w-[120px]'>
						<FormInput
							form={form}
							name={`languageList.${index}.name`}
							kind={'text'}
							max={10}
							handleChange={handleChange}
						/>
						<FormInput
							form={form}
							name={`languageList.${index}.level`}
							kind={'label'}
							handleChange={handleChange}
						/>
					</div>
				</div>
			))}
			<AppendButton
				label='Add language'
				handleClick={() => appendLanguage({ ...DEFAULT_LANGUAGE, id: crypto.randomUUID().toString() })}
			/>
		</section>
	);
};

export default ResumeLanguageList;
