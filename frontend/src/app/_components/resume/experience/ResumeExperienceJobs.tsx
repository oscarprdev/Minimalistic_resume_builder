'use client';

import { UseFormReturn, Path } from 'react-hook-form';
import { ExperienceFormState } from './utils';
import FormTextarea from '../../forms/FormTextarea';
import FormInput from '../../forms/FormInput';
import { useState } from 'react';
import { Job } from '@/types';
import RemoveItemButton from '../../buttons/RemoveItemButton';
import AppendButton from '../common/AppendButton';

interface ResumeExperienceJobsProps {
	form: UseFormReturn<ExperienceFormState, any, undefined>;
	handleChange: (form: UseFormReturn<ExperienceFormState>, name: Path<ExperienceFormState>, value: any) => void;
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

const ResumeExperienceJobs = ({ form, handleChange }: ResumeExperienceJobsProps) => {
	const [jobList, setJobList] = useState<Job[]>(form.getValues(JOB_LIST_NAME));

	const appendJob = (newJob: Job) => {
		const updatedJobs = [...form.getValues(JOB_LIST_NAME), newJob];
		setJobList(updatedJobs);
		handleChange(form, JOB_LIST_NAME, updatedJobs);
	};

	const removeJob = (index: number) => {
		const updatedJobs = form.getValues(JOB_LIST_NAME).filter((_, i) => i !== index);
		setJobList(updatedJobs);
		handleChange(form, JOB_LIST_NAME, updatedJobs);
	};

	return (
		<section className='flex flex-col gap-8'>
			{jobList.map((_, index) => (
				<div
					key={_.id}
					className='relative flex items-center -mb-2 first:mt-2'>
					<span className='absolute -top-1 -left-5'>
						<RemoveItemButton
							index={index}
							text={'Remove job'}
							onRemove={() => removeJob(index)}
						/>
					</span>

					<div className='flex flex-col w-full'>
						<div className='flex justify-between w-full gap-2'>
							<FormInput
								form={form}
								name={`jobList.${index}.title`}
								kind={'subtitle'}
								handleChange={handleChange}
							/>
							<div className='flex gap-1 items-center mr-10'>
								<div className='w-[57px]'>
									<FormInput
										form={form}
										name={`jobList.${index}.startDate`}
										kind={'label'}
										max={4}
										handleChange={handleChange}
									/>
								</div>
								<span className='w-1 h-[0.1rem] bg-gray-500 -mt-2 ml-1' />
								<div className='w-[90px]'>
									<FormInput
										form={form}
										name={`jobList.${index}.endDate`}
										kind={'label'}
										max={12}
										handleChange={handleChange}
									/>
								</div>
							</div>
						</div>
						<FormInput
							form={form}
							name={`jobList.${index}.company`}
							kind={'label'}
							handleChange={handleChange}
						/>
						<FormTextarea
							form={form}
							name={`jobList.${index}.description`}
							maxLength={400}
							handleChange={handleChange}
						/>
					</div>
				</div>
			))}
			<AppendButton
				label='Add job'
				handleClick={() => appendJob({ ...DEFAULT_JOB, id: crypto.randomUUID().toString() })}
			/>
		</section>
	);
};

export default ResumeExperienceJobs;
