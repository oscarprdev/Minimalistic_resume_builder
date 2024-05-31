'use client';

import { Button } from '@/components/ui/button';
import { UseFormReturn, Path } from 'react-hook-form';
import { IconPlus } from '@tabler/icons-react';
import FormInput from '../../forms/FormInput';
import { useState } from 'react';
import { Skill } from '@/types';
import RemoveItemButton from '../../buttons/RemoveItemButton';
import { SkillsFormState } from './utils';
import ResumeSkillsIcons from './ResumeSkillIcon';

interface ResumeSkillListProps {
	form: UseFormReturn<SkillsFormState, any, undefined>;
	errors: string[];
	handleChange: (form: UseFormReturn<SkillsFormState>, name: Path<SkillsFormState>, value: any) => void;
}

const SKILL_LIST_NAME = 'skillList';

const DEFAULT_SKILL: Omit<Skill, 'id'> = {
	name: 'skill',
	svgUrl: '',
};

const ResumeSkillList = ({ form, errors, handleChange }: ResumeSkillListProps) => {
	const [skillList, setSkillList] = useState<Omit<Skill, 'id'>[]>(form.getValues(SKILL_LIST_NAME));

	const appendSkill = (newskill: Omit<Skill, 'id'>) => {
		const updatedSkill = [...form.getValues(SKILL_LIST_NAME), newskill];
		setSkillList(updatedSkill);
		handleChange(form, SKILL_LIST_NAME, updatedSkill);
	};

	const removeSkill = (index: number) => {
		const updatedSkill = form.getValues(SKILL_LIST_NAME).filter((_, i) => i !== index);
		setSkillList(updatedSkill);
		handleChange(form, SKILL_LIST_NAME, updatedSkill);
	};

	return (
		<section className='flex items-center gap-1 mt-4 justify-start'>
			{skillList.map((_, index) => (
				<div
					key={_.name}
					className='relative flex items-center'>
					<span className='absolute -top-1 -left-6'>
						<RemoveItemButton
							index={index}
							text={'Remove skill'}
							onRemove={() => removeSkill(index)}
						/>
					</span>

					<div className='flex items-center w-[100px] mt-[0.15rem] ml-1'>
						<span className='grid place-items-center -mt-[0.55rem] -mr-1'>
							<ResumeSkillsIcons value={form.getValues(SKILL_LIST_NAME)[index].name} />
						</span>
						<FormInput
							form={form}
							name={`skillList.${index}.name`}
							kind={'text'}
							max={10}
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
				onClick={() => appendSkill(DEFAULT_SKILL)}>
				<IconPlus
					stroke={1}
					width={20}
				/>
				Add skill
			</Button>
		</section>
	);
};

export default ResumeSkillList;
