import { Experience } from '@/types';
import { z } from 'zod';

export const jobFormSchema = z.object({
	id: z.string(),
	title: z.string(),
	company: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	description: z.string(),
});

export const experienceFormSchema = z.object({
	title: z.string(),
	jobList: z.array(jobFormSchema).refine(
		(values) => {
			const newItem = values[values.length - 1];

			values.pop();

			const isAlreadyStored = values.some((val) => val.title === newItem.title);

			return !isAlreadyStored;
		},
		{ message: 'Job title must be unique' }
	),
});

export type ExperienceFormState = Omit<Experience, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';
