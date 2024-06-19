'use client';

import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { ExperienceFormState } from './AsideFormExperience';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { OptionalJob } from '@/store/useResumeExperienceStore';
import { useMemo } from 'react';

interface AsideFormExperienceJobListProps {
	form: UseFormReturn<ExperienceFormState, any, undefined>;
}

const JOB_LIST_NAME = 'jobList';

const DEFAULT_JOB: OptionalJob = {
	title: 'New job',
	company: 'Company',
	startDate: '2017-03-29',
	endDate: '2018-05-02',
	description: 'Your job description.',
};

const AsideFormExperienceJobList = ({ form }: AsideFormExperienceJobListProps) => {
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: JOB_LIST_NAME,
	});

	const formJobListFieldsError = useMemo(() => form.formState.errors.jobList, [form.formState.errors.jobList]);

	return (
		<section className='flex flex-col gap-5 w-full'>
			{fields.map((_, index) => (
				<div
					key={_.title}
					className='flex flex-col items-center w-full gap-2'>
					<FormField
						control={form.control}
						name={`jobList.${index}.title`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel className='text-sm text-gray-500'>Job title</FormLabel>
								<FormControl>
									<Input
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
										{...field}
										className='min-h-[80px]'
										{...form.register(`jobList.${index}.description`)}
									/>
								</FormControl>
								<FormMessage className='text-sm' />
							</FormItem>
						)}
					/>
					<Button
						type='button'
						className='w-full'
						variant={'outline'}
						onClick={() => remove(index)}>
						Remove job
					</Button>
				</div>
			))}
			{formJobListFieldsError && <FormMessage>{formJobListFieldsError.root?.message}</FormMessage>}
			<Button
				type='button'
				onClick={() => append(DEFAULT_JOB)}>
				Add job
			</Button>
		</section>
	);
};

export default AsideFormExperienceJobList;
