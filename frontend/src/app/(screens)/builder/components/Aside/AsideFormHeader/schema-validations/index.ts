import { z } from 'zod';

export type FormHeaderValues = z.infer<typeof asideFormHeaderSchema>;

export const asideFormHeaderSchema = z.object({
	name: z.string(),
	job: z.string().max(200, { message: 'Job description must be less than 200 characters.' }),
	location: z.string(),
	email: z.string().email({
		message: 'Invalid email address.',
	}),
	phone: z.string().regex(/^(\+?\d{1,12}|\d{1,9})$/, {
		message: 'Only valid formats: (xxx xxx xxx) or (+xx xxx xxx xxx).',
	}),
	links: z
		.array(
			z.string().url({
				message: 'Invalid link format.',
			})
		)
		.default([]),
	image: z.string().optional(),
});
