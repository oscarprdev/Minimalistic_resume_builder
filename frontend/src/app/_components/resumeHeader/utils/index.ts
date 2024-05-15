import { Header } from '@/types';
import { z } from 'zod';

export const headerFormSchema = z.object({
	name: z.string(),
	job: z.string(),
	location: z.string(),
	email: z.string().email(),
	phone: z.string().min(1).max(9),
	links: z.array(z.string().url()),
	image: z.string().optional(),
});

// export type HeaderFormValues = z.infer<typeof headerFormSchema>;

export type HeaderFormState = Omit<Header, 'id'>;
