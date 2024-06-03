'use client';

import { UseFormReturn, Path } from 'react-hook-form';
import FormInput from '../../forms/FormInput';
import { useState } from 'react';
import { Skill } from '@/types';
import RemoveItemButton from '../../buttons/RemoveItemButton';
import { SkillsFormState } from './utils';
import ResumeSkillsIcons from './ResumeSkillIcon';
import AppendButton from '../common/AppendButton';

interface ResumeSkillListProps {
	form: UseFormReturn<SkillsFormState, any, undefined>;
	handleChange: (form: UseFormReturn<SkillsFormState>, name: Path<SkillsFormState>, value: any) => void;
}

const SKILL_LIST_NAME = 'skillList';

const DEFAULT_SKILL: Skill = {
	id: '',
	name: 'skill',
	svgUrl: '',
};

const ResumeSkillList = ({ form, handleChange }: ResumeSkillListProps) => {
	const [skillList, setSkillList] = useState<Skill[]>(form.getValues(SKILL_LIST_NAME));

	const appendSkill = (newskill: Skill) => {
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
		<section className='flex items-center gap-1 mt-2 w-full justify-start flex-wrap ml-2'>
			{skillList.map((_, index) => (
				<div
					key={_.id}
					className='relative flex items-center'>
					<span className='absolute -top-1 -left-6'>
						<RemoveItemButton
							index={index}
							text={'Remove skill'}
							onRemove={() => removeSkill(index)}
						/>
					</span>

					<div className='flex items-center w-[120px] mt-[0.15rem] ml-1'>
						<span className='grid place-items-center -mt-[0.55rem] -mr-1'>
							<ResumeSkillsIcons value={form.getValues(SKILL_LIST_NAME)[index].name} />
						</span>
						<FormInput
							form={form}
							name={`skillList.${index}.name`}
							kind={'text'}
							max={10}
							handleChange={handleChange}
						/>
					</div>
				</div>
			))}
			<AppendButton
				label='Add skill'
				handleClick={() => appendSkill({ ...DEFAULT_SKILL, id: crypto.randomUUID().toString() })}
			/>
		</section>
	);
};

export default ResumeSkillList;
