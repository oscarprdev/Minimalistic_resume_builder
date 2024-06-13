'use client';

import { UseFormReturn, Path } from 'react-hook-form';
import { useState } from 'react';
import { Job } from '@/types';
import { ExperienceFormState } from './AsideFormExperience';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface AsideFormExperienceJobListProps {
	form: UseFormReturn<ExperienceFormState, any, undefined>;
}

const JOB_LIST_NAME = 'jobList';

const DEFAULT_JOB: Job = {
	id: '',
	title: 'Second job',
	company: 'Web Solutions LLC',
	startDate: '2017',
	endDate: '2018',
	description:
		'Assisted in the development of client projects, including website and mobile application development. Gained experience in HTML, CSS, and PHP.',
};

const AsideFormExperienceJobList = ({ form }: AsideFormExperienceJobListProps) => {
	const [jobList, setJobList] = useState<Job[]>(form.getValues(JOB_LIST_NAME));

	const appendJob = (newJob: Job) => {
		const updatedJobs = [...form.getValues(JOB_LIST_NAME), newJob];
		setJobList(updatedJobs);
	};

	const removeJob = (index: number) => {
		const updatedJobs = form.getValues(JOB_LIST_NAME).filter((_, i) => i !== index);
		setJobList(updatedJobs);
	};

	return (
		<section className='flex flex-col gap-5'>
			{jobList.map((_, index) => (
				<div
					key={_.id}
					className='relative flex items-center -mb-2 first:mt-2'>
					<span className='absolute -top-1 -left-5'>
						<Button
							type='button'
							onClick={() => removeJob(index)}>
							Remove job
						</Button>
					</span>

					<div className='flex flex-col w-full'>
						<div className='flex justify-between w-full gap-2'>
							<FormField
								control={form.control}
								name={`jobList.${index}.title`}
								render={({ field }) => (
									<FormItem className='flex items-center -mt-2 w-full'>
										<FormLabel className='text-sm text-gray-500'>Resume title</FormLabel>
										<FormControl>
											<Input
												{...field}
												className='w-full'
											/>
										</FormControl>
										<FormMessage>''</FormMessage>
									</FormItem>
								)}
							/>
							<div className='flex gap-1 items-center mr-10'>
								<div className='w-[57px]'>
									<FormField
										control={form.control}
										name={`jobList.${index}.startDate`}
										render={({ field }) => (
											<FormItem className='flex items-center -mt-2 w-full'>
												<FormControl>
													<Input
														{...field}
														className='w-full'
													/>
												</FormControl>
												<FormMessage>''</FormMessage>
											</FormItem>
										)}
									/>
								</div>
								<span className='w-1 h-[0.1rem] bg-gray-500 -mt-2 ml-1' />
								<div className='w-[90px]'>
									<FormField
										control={form.control}
										name={`jobList.${index}.endDate`}
										render={({ field }) => (
											<FormItem className='flex items-center -mt-2 w-full'>
												<FormControl>
													<Input
														{...field}
														className='w-full'
													/>
												</FormControl>
												<FormMessage>''</FormMessage>
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
						<FormField
							control={form.control}
							name={`jobList.${index}.company`}
							render={({ field }) => (
								<FormItem className='flex items-center -mt-2 w-full'>
									<FormControl>
										<Input
											{...field}
											className='w-full'
										/>
									</FormControl>
									<FormMessage>''</FormMessage>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={`jobList.${index}.description`}
							render={({ field }) => (
								<FormItem className='flex items-center -mt-2 w-full'>
									<FormControl>
										<Textarea
											{...field}
											className='w-full'
										/>
									</FormControl>
									<FormMessage>''</FormMessage>
								</FormItem>
							)}
						/>
					</div>
				</div>
			))}
			<Button
				type='button'
				onClick={() => appendJob({ ...DEFAULT_JOB, id: crypto.randomUUID().toString() })}>
				Add job
			</Button>
		</section>
	);
};

export default AsideFormExperienceJobList;
