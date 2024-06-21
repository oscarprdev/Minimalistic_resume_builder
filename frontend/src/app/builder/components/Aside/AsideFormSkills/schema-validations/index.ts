import { z } from 'zod';

const skillFormSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	svgUrl: z.string(),
});

export const asideFormSkillsSchema = z.object({
	title: z.string(),
	skillList: z.array(skillFormSchema),
});
