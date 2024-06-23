'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { EducationFormState } from './AsideFormEducation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { OptionalSchool } from '@/store/useResumeEducationStore';
import { useMemo } from 'react';
import { useFieldArrayAnimations } from '@/hooks/use-field-array-animations';
import FormDates from '../shared/components/FormDates';

interface AsideFormEducationListProps {
	form: UseFormReturn<EducationFormState, any, undefined>;
}

const EDUCATION_LIST_NAME = 'educationList';

const DEFAULT_EDUCATION: OptionalSchool = {
	title: '',
	career: '',
	startDate: '',
	endDate: '',
	description: '',
	formatTime: '',
};

const AsideFormEducationList = ({ form }: AsideFormEducationListProps) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: EDUCATION_LIST_NAME,
	});

	const formEducationListFieldsError = useMemo(() => form.formState.errors.educationList, [form.formState.errors.educationList]);

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
						name={`educationList.${index}.title`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Education title</FormLabel>
								<FormControl>
									<Input
										placeholder='Your education title'
										required
										{...field}
										{...form.register(`educationList.${index}.title`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<FormDates
						form={form}
						index={index}
						label='educationList'
					/>
					<FormField
						control={form.control}
						name={`educationList.${index}.career`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>School</FormLabel>
								<FormControl>
									<Input
										placeholder='School name'
										required
										{...field}
										{...form.register(`educationList.${index}.career`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`educationList.${index}.description`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Description</FormLabel>
								<FormControl>
									<Textarea
										className='min-h-[80px]'
										placeholder='Description'
										required
										{...field}
										{...form.register(`educationList.${index}.description`)}
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
						Remove education
					</Button>
				</article>
			))}
			{formEducationListFieldsError && <FormMessage className='text-xs'>{formEducationListFieldsError.root?.message}</FormMessage>}
			<Button
				type='button'
				variant={'outline'}
				onClick={() => append(DEFAULT_EDUCATION)}>
				Add education
			</Button>
		</section>
	);
};

export default AsideFormEducationList;
