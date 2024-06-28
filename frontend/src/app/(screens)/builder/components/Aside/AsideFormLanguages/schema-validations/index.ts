import { z } from 'zod';

export type FormLanguagesValues = z.infer<typeof asideFormLanguagesSchema>;

const languageFormSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	level: z.string(),
	certificateLink: z
		.string()
		.refine((value) => value === '' || /^[a-zA-Z]+:\/\//.test(value), {
			message: 'Invalid URL format',
		})
		.optional(),
});

export const asideFormLanguagesSchema = z.object({
	title: z.string(),
	isHidden: z.boolean().default(false),
	languageList: z.array(languageFormSchema).default([]),
});
