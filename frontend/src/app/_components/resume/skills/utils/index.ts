import { Skills } from '@/types';
import { z } from 'zod';

export const skillFormSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	svgUrl: z.string(),
});

export const skillsFormSchema = z.object({
	title: z.string(),
	skillList: z.array(skillFormSchema),
});

export type SkillsFormState = Omit<Skills, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';
