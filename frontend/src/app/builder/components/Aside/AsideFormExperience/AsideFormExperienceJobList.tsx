'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ExperienceFormState } from './AsideFormExperience';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { OptionalJob } from '@/store/useResumeExperienceStore';
import { useMemo } from 'react';
import { useFieldArrayAnimations } from '@/hooks/use-field-array-animations';

interface AsideFormExperienceJobListProps {
	form: UseFormReturn<ExperienceFormState, any, undefined>;
}

const JOB_LIST_NAME = 'jobList';

const DEFAULT_JOB: OptionalJob = {
	title: '',
	company: '',
	startDate: '',
	endDate: '',
	description: '',
};

const AsideFormExperienceJobList = ({ form }: AsideFormExperienceJobListProps) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: JOB_LIST_NAME,
	});

	const formJobListFieldsError = useMemo(() => form.formState.errors.jobList, [form.formState.errors.jobList]);

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
						name={`jobList.${index}.title`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Job title</FormLabel>
								<FormControl>
									<Input
										placeholder='Your job title'
										{...field}
										{...form.register(`jobList.${index}.title`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<div className='flex gap-1 items-start w-full'>
						<FormField
							control={form.control}
							name={`jobList.${index}.startDate`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-sm text-gray-500'>Start date</FormLabel>
									<FormControl>
										<Input
											placeholder='Start date'
											{...field}
											{...form.register(`jobList.${index}.startDate`)}
										/>
									</FormControl>
									<FormMessage className='text-xs' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={`jobList.${index}.endDate`}
							render={({ field }) => (
								<FormItem>
									<FormLabel className='text-sm text-gray-500'>End date</FormLabel>
									<FormControl>
										<Input
											placeholder='End date'
											{...field}
											{...form.register(`jobList.${index}.endDate`)}
										/>
									</FormControl>
									<FormMessage className='text-xs' />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name={`jobList.${index}.company`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Company</FormLabel>
								<FormControl>
									<Input
										placeholder='Company name'
										{...field}
										{...form.register(`jobList.${index}.company`)}
									/>
								</FormControl>
								<FormMessage className='text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`jobList.${index}.description`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Job Description</FormLabel>
								<FormControl>
									<Textarea
										className='min-h-[80px]'
										placeholder='Job description'
										{...field}
										{...form.register(`jobList.${index}.description`)}
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
						Remove job
					</Button>
				</article>
			))}
			{formJobListFieldsError && <FormMessage className='text-xs'>{formJobListFieldsError.root?.message}</FormMessage>}
			<Button
				type='button'
				variant={'outline'}
				onClick={() => append(DEFAULT_JOB)}>
				Add job
			</Button>
		</section>
	);
};

export default AsideFormExperienceJobList;
