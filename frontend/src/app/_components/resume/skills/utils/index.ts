import { Skills } from '@/types';
import { z } from 'zod';

export const skillFormSchema = z.object({
	id: z.string(),
	name: z.string(),
	svgUrl: z.string(),
});

export const skillsFormSchema = z.object({
	title: z.string(),
	skillList: z.array(skillFormSchema).refine(
		(values) => {
			const newItem = values[values.length - 1];

			values.pop();

			const isAlreadyStored = values.some((val) => val.name === newItem.name);

			return !isAlreadyStored;
		},
		{ message: 'Skill name must be unique' }
	),
});

export type SkillsFormState = Omit<Skills, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';
