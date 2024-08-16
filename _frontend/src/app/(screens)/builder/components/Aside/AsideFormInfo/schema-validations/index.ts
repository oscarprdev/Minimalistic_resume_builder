import { z } from 'zod';

export type FormInfoValues = z.infer<typeof asideFormInfoSchema>;

export const asideFormInfoSchema = z.object({
	title: z.string().min(5, {
		message: 'Title must be at least 5 characters.',
	}),
});
