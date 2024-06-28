import { z } from 'zod';

export type FormLanguagesValues = z.infer<typeof asideFormLanguagesSchema>;

const languageFormSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	level: z.string(),
	certificateLink: z.string().optional(),
});

export const asideFormLanguagesSchema = z.object({
	title: z.string(),
	languageList: z.array(languageFormSchema).default([]),
});
