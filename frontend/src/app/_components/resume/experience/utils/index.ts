import { Experience } from '@/types';
import { z } from 'zod';

export const jobFormSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	company: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	description: z.string(),
});

export const experienceFormSchema = z.object({
	title: z.string(),
	jobList: z.array(jobFormSchema),
});

export type ExperienceFormState = Omit<Experience, 'id'>;

export type FormFieldContainer = 'input' | 'textarea';
