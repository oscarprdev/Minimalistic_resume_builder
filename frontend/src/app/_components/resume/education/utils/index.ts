import { Education } from '@/types';
import { z } from 'zod';

export const schoolFormSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	career: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	description: z.string(),
});

export const educationFormSchema = z.object({
	title: z.string(),
	educationList: z.array(schoolFormSchema),
});

export type EducationFormState = Omit<Education, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';
