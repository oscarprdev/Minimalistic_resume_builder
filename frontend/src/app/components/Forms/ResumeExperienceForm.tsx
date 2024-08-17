import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { defaultJob, defaultResume } from '@/data/default-resume';
import { DefaultResumeExperience } from '@/data/default-resume.types';
import { Either, isError } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RESUME_THEME, useResumeThemeStore } from '@/store/useResumeThemeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconTextPlus, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

export type ResumeExperienceFormValues = z.infer<typeof resumeExperienceFormSchema>;
type ResumeExperienceFormProps = {
	handleSubmit(values: ResumeExperienceFormValues): Promise<void>;
	afterResumeExperienceFormSubmit(): void;
	submitResponse: Either<string, string> | undefined;
	defaultValues: DefaultResumeExperience;
};

const resumeExperienceFormSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	jobList: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			company: z.string(),
			description: z.string(),
			dates: z.string(),
		})
	),
	isHidden: z.boolean(),
	error: z.union([z.string(), z.null()]),
});

const ResumeExperienceForm = ({
	handleSubmit,
	afterResumeExperienceFormSubmit,
	submitResponse,
	defaultValues,
}: ResumeExperienceFormProps) => {
	const [isFocused, setIsFocused] = useState(false);

	const { theme } = useResumeThemeStore();

	const form = useForm<ResumeExperienceFormValues>({
		resolver: zodResolver(resumeExperienceFormSchema),
		defaultValues: { ...defaultValues, error: null },
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'jobList' as never,
	});

	const debounced = useDebouncedCallback(() => {
		handleSubmit(form.getValues());
	}, 500);

	useEffect(() => {
		if (submitResponse) {
			if (isError(submitResponse)) {
				return form.setValue('error', submitResponse.error);
			} else {
				afterResumeExperienceFormSubmit();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitResponse]);

	return (
		<Form {...form}>
			<form
				onChange={debounced}
				onMouseEnter={() => setIsFocused(true)}
				onMouseLeave={() => setIsFocused(false)}
				className="relative flex flex-col w-full hover:bg-zinc-100/50 duration-200 pl-5">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									variant={'resume'}
									className={cn(theme === RESUME_THEME.DEFAULT && 'text-2xl font-bold')}
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex flex-col gap-0 w-full">
					{isFocused && (
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										type="button"
										size={'sm'}
										className="absolute top-2 right-2 bg-zinc-100/50 hover:bg-zinc-200/50 p-2 border shadow-sm w-fit"
										onClick={() => append(defaultJob)}>
										<IconTextPlus size={16} className="text-zinc-400" />
									</Button>
								</TooltipTrigger>
								<TooltipContent side="right">
									<p className="text-xs">Add experience</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)}
					{fields.map((field, index) => (
						<article key={field.id} className="relative w-full flex flex-col gap-0">
							{isFocused && (
								<IconX
									onClick={() => remove(index)}
									size={14}
									className="text-zinc-400 hover:text-zinc-900 absolute -left-4 top-[0.8rem] cursor-pointer duration-200"
								/>
							)}
							<FormField
								control={form.control}
								name={`jobList.${index}.company`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`jobList.${index}.company`)}
												className={cn(
													theme === RESUME_THEME.DEFAULT &&
														'text-md text-zinc-700 w-full text-sm font-bold'
												)}
												variant={'resume'}
												required
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`jobList.${index}.dates`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`jobList.${index}.dates`)}
												className={cn(
													theme === RESUME_THEME.DEFAULT &&
														'text-md w-[300px] text-zinc-700 text-xs text-right absolute top-0 right-5'
												)}
												variant={'resume'}
												required
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`jobList.${index}.title`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`jobList.${index}.title`)}
												className={cn(
													theme === RESUME_THEME.DEFAULT &&
														'text-md text-zinc-800 w-full text-sm -mt-4'
												)}
												variant={'resume'}
												required
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`jobList.${index}.description`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												{...field}
												{...form.register(`jobList.${index}.description`)}
												className={cn(
													!isFocused && 'resize-none ',
													theme === RESUME_THEME.DEFAULT &&
														'text-sm text-zinc-500 min-h-[60px] text-pretty'
												)}
												variant={'resume'}
												required
											/>
										</FormControl>
										<FormMessage className="text-xs" />
									</FormItem>
								)}
							/>
						</article>
					))}
				</div>
				<div className="relative flex flex-col items-center w-full gap-2 mt-6">
					{form.watch('error') && (
						<FormMessage className="absolute -top-5 w-[200%] text-center">
							{form.getValues('error')}
						</FormMessage>
					)}
				</div>
			</form>
		</Form>
	);
};

export default ResumeExperienceForm;
