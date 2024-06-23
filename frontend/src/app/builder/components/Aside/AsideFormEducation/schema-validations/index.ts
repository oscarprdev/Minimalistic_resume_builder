import { z } from 'zod';

const schoolFormSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	career: z.string(),
	startDate: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
		message: 'Valid format YYYY-MM-DD',
	}),
	endDate: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
		message: 'Valid format YYYY-MM-DD',
	}),
	description: z.string().max(200, {
		message: 'Education description must be less than 200 characters.',
	}),
	formatTime: z.string().default(''),
});

export const asideFormEducationSchema = z.object({
	title: z.string(),
	educationList: z.array(schoolFormSchema),
});
