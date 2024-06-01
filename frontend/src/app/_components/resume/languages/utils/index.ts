import { Languages } from '@/types';
import { z } from 'zod';

export const schoolFormSchema = z.object({
	id: z.string(),
	name: z.string(),
	level: z.string(),
	certificateLink: z.string().optional(),
});

export const languagesFormSchema = z.object({
	title: z.string(),
	languageList: z.array(schoolFormSchema),
});

export type LanguagesFormState = Omit<Languages, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';
