import { OptionalJob } from '@/store/useResumeExperienceStore';
import { z } from 'zod';

const isEndDateGreaterThanStartDate = (item: OptionalJob) => {
	return new Date(item.startDate) < new Date(item.endDate);
};

const isTitleUnique = (values: OptionalJob[]) => {
	const titles = values.map((item) => item.title);
	return new Set(titles).size === titles.length;
};

const areDateRangesUnique = (values: OptionalJob[]) => {
	for (let i = 0; i < values.length; i++) {
		for (let j = i + 1; j < values.length; j++) {
			const date1Start = new Date(values[i].startDate);
			const date1End = new Date(values[i].endDate);
			const date2Start = new Date(values[j].startDate);
			const date2End = new Date(values[j].endDate);

			if ((date1Start <= date2End && date1End >= date2Start) || (date2Start <= date1End && date2End >= date1Start)) {
				return false;
			}
		}
	}
	return true;
};

const jobFormSchema = z
	.object({
		id: z.string().optional(),
		title: z.string(),
		company: z.string(),
		startDate: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
			message: 'Valid format YYYY-MM-DD',
		}),
		endDate: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
			message: 'Valid format YYYY-MM-DD',
		}),
		description: z.string().max(200, {
			message: 'Job description must be less than 200 characters.',
		}),
		formatTime: z.string().default(''),
		descriptionDisabled: z.boolean().default(false),
	})
	.superRefine((data, ctx) => {
		if (!isEndDateGreaterThanStartDate(data)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'End date must be later than start date',
				path: ['endDate'],
			});
		}
	});

export const asideFormExperienceSchema = z.object({
	title: z.string(),
	jobList: z.array(jobFormSchema).superRefine((values, ctx) => {
		if (!isTitleUnique(values)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Job title must be unique',
			});
		}

		if (!areDateRangesUnique(values)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Start date and end date must be different',
			});
		}
	}),
});
