'use client';

import { Button } from '@/components/ui/button';
import { UseFormReturn, Path } from 'react-hook-form';
import { IconPlus } from '@tabler/icons-react';
import FormInput from '../../forms/FormInput';
import { useState } from 'react';
import { Language } from '@/types';
import RemoveItemButton from '../../buttons/RemoveItemButton';
import { LanguagesFormState } from './utils';

interface ResumeLanguageListProps {
	form: UseFormReturn<LanguagesFormState, any, undefined>;
	errors: string[];
	handleChange: (form: UseFormReturn<LanguagesFormState>, name: Path<LanguagesFormState>, value: any) => void;
}

const LANGUAGE_LIST_NAME = 'languageList';

const DEFAULT_LANGUAGE: Omit<Language, 'id'> = {
	name: 'English',
	level: 'Medium',
	certificateLink: '-',
};

const ResumeLanguageList = ({ form, errors, handleChange }: ResumeLanguageListProps) => {
	const [languageList, setLanguageList] = useState<Omit<Language, 'id'>[]>(form.getValues(LANGUAGE_LIST_NAME));

	const appendLanguage = (newlanguage: Omit<Language, 'id'>) => {
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
		<section className='flex items-center gap-1 mt-4 justify-start'>
			{languageList.map((_, index) => (
				<div
					key={_.name}
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
							error={errors[index]}
						/>
						<FormInput
							form={form}
							name={`languageList.${index}.level`}
							kind={'label'}
							handleChange={handleChange}
							error={errors[index]}
						/>
					</div>
				</div>
			))}
			<Button
				type='button'
				variant={'outline'}
				size={'sm'}
				className='absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition duration-300'
				onClick={() => appendLanguage(DEFAULT_LANGUAGE)}>
				<IconPlus
					stroke={1}
					width={20}
				/>
				Add language
			</Button>
		</section>
	);
};

export default ResumeLanguageList;
