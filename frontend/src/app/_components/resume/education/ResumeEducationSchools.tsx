'use client';

import { UseFormReturn, Path } from 'react-hook-form';
import { EducationFormState } from './utils';
import FormInput from '../../forms/FormInput';
import { useState } from 'react';
import { School } from '@/types';
import RemoveItemButton from '../../buttons/RemoveItemButton';
import ResumeEducationDescriptionField from './ResumeEducationDescriptionField';
import AppendButton from '../common/AppendButton';

interface ResumeEducationSchoolsProps {
	form: UseFormReturn<EducationFormState, any, undefined>;
	handleChange: (form: UseFormReturn<EducationFormState>, name: Path<EducationFormState>, value: any) => void;
}

const EDUCATION_LIST_NAME = 'educationList';

const DEFAULT_SCHOOL: School = {
	id: '',
	title: 'Second school',
	career: 'Web Solutions LLC',
	startDate: '2017',
	endDate: '2018',
	description:
		'Assisted in the development of client projects, including website and mobile application development. Gained education in HTML, CSS, and PHP.',
};

const ResumeEducationSchools = ({ form, handleChange }: ResumeEducationSchoolsProps) => {
	const [educationList, setEducationList] = useState<School[]>(form.getValues(EDUCATION_LIST_NAME));

	const appendschool = (newschool: School) => {
		const updatedschools = [...form.getValues(EDUCATION_LIST_NAME), newschool];
		setEducationList(updatedschools);
		handleChange(form, EDUCATION_LIST_NAME, updatedschools);
	};

	const removeschool = (index: number) => {
		const updatedschools = form.getValues(EDUCATION_LIST_NAME).filter((_, i) => i !== index);
		setEducationList(updatedschools);
		handleChange(form, EDUCATION_LIST_NAME, updatedschools);
	};

	return (
		<section className='flex flex-col gap-8'>
			{educationList.map((_, index) => (
				<div
					key={_.id}
					className='relative flex items-center -mb-2 first:mt-2'>
					<span className='absolute -top-1 -left-5'>
						<RemoveItemButton
							index={index}
							text={'Remove school'}
							onRemove={() => removeschool(index)}
						/>
					</span>

					<div className='flex flex-col w-full'>
						<div className='flex justify-between w-full gap-2'>
							<FormInput
								form={form}
								name={`educationList.${index}.title`}
								kind={'subtitle'}
								handleChange={handleChange}
							/>
							<div className='flex gap-1 items-center mr-3'>
								<div className='w-[57px]'>
									<FormInput
										form={form}
										name={`educationList.${index}.startDate`}
										kind={'label'}
										max={4}
										handleChange={handleChange}
									/>
								</div>
								<span className='w-1 h-[0.1rem] bg-gray-500 -mt-2 ml-1' />
								<div className='w-[120px]'>
									<FormInput
										form={form}
										name={`educationList.${index}.endDate`}
										kind={'label'}
										max={12}
										handleChange={handleChange}
									/>
								</div>
							</div>
						</div>
						<FormInput
							form={form}
							name={`educationList.${index}.career`}
							kind={'label'}
							handleChange={handleChange}
						/>
						<ResumeEducationDescriptionField
							index={index}
							form={form}
							handleChange={handleChange}
						/>
					</div>
				</div>
			))}
			<AppendButton
				label='Add school'
				handleClick={() => appendschool({ ...DEFAULT_SCHOOL, id: crypto.randomUUID().toString() })}
			/>
		</section>
	);
};

export default ResumeEducationSchools;
