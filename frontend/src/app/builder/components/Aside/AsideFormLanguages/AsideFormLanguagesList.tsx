'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { LanguagesFormState } from './AsideFormLanguages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { OptionalLanguage } from '@/store/useResumeLanguagesStore';
import { useMemo } from 'react';
import { useFieldArrayAnimations } from '@/hooks/useFieldArrayAnimations';

interface AsideFormLanguagesListProps {
	form: UseFormReturn<LanguagesFormState, any, undefined>;
}

const LANGUAGES_LIST_NAME = 'languageList';

const DEFAULT_LANGUAGES: OptionalLanguage = {
	name: '',
	level: '',
};

const AsideFormLanguagesList = ({ form }: AsideFormLanguagesListProps) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: LANGUAGES_LIST_NAME,
	});

	const formLanguagesListFieldsError = useMemo(() => form.formState.errors.languageList, [form.formState.errors.languageList]);

	const { onRemoveListElement, asignRef } = useFieldArrayAnimations(remove);

	return (
		<section className='flex flex-col gap-5 w-full'>
			{fields.map((_, index) => (
				<article
					key={_.id}
					ref={(el) => asignRef(el, _.id)}
					className='relative flex flex-col items-center w-full space-y-4 animate-fade-up'>
					<span
						aria-hidden
						className='absolute top-1 bg-gray-100 w-52 h-[0.1rem]'
					/>
					<FormField
						control={form.control}
						name={`languageList.${index}.name`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Language</FormLabel>
								<FormControl>
									<Input
										placeholder='Language'
										required
										{...field}
										{...form.register(`languageList.${index}.name`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`languageList.${index}.level`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Level</FormLabel>
								<FormControl>
									<Input
										placeholder='Level'
										required
										{...field}
										{...form.register(`languageList.${index}.level`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`languageList.${index}.certificateLink`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Link</FormLabel>
								<FormControl>
									<Input
										placeholder='Link'
										{...field}
										{...form.register(`languageList.${index}.certificateLink`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<Button
						type='button'
						className='w-full'
						variant={'clean'}
						onClick={() => onRemoveListElement(index, _.id)}>
						Remove language
					</Button>
				</article>
			))}
			{formLanguagesListFieldsError && <FormMessage className='text-xs'>{formLanguagesListFieldsError.root?.message}</FormMessage>}
			<Button
				type='button'
				variant={'outline'}
				onClick={() => append(DEFAULT_LANGUAGES)}>
				Add language
			</Button>
		</section>
	);
};

export default AsideFormLanguagesList;
