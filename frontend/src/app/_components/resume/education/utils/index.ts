import { Education } from '@/types';
import { z } from 'zod';

export const schoolFormSchema = z.object({
	id: z.string(),
	title: z.string(),
	career: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	description: z.string(),
});

export const educationFormSchema = z.object({
	title: z.string(),
	educationList: z.array(schoolFormSchema).refine(
		(values) => {
			const newItem = values[values.length - 1];

			values.pop();

			const isAlreadyStored = values.some((val) => val.title === newItem.title);

			return !isAlreadyStored;
		},
		{ message: 'Study title must be unique' }
	),
});

export type EducationFormState = Omit<Education, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';
