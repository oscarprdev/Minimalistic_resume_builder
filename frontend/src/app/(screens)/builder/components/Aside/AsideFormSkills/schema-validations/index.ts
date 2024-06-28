import { z } from 'zod';

export type FormSkillsValues = z.infer<typeof asideFormSkillsSchema>;

const skillFormSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	svgUrl: z.string(),
});

export const asideFormSkillsSchema = z.object({
	title: z.string(),
	isHidden: z.boolean().default(false),
	skillList: z.array(skillFormSchema).default([]),
});
