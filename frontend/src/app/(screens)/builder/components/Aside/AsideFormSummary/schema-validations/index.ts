import { z } from 'zod';

export type FormSummaryValues = z.infer<typeof asideFormSummarySchema>;

export const asideFormSummarySchema = z.object({
	title: z.string().min(5, {
		message: 'Title must be at least 5 characters.',
	}),
	summary: z.string().max(300, {
		message: 'Summary must be less than 300 characters.',
	}),
});
