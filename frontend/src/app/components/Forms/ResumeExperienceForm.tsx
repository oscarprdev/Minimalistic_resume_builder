import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import ButtonTooltip from '@/app/containers/ButtonTooltip';
import { defaultJob, defaultResume } from '@/data/default-resume';
import { DefaultResumeExperience } from '@/data/default-resume.types';
import { Either, isError } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RESUME_THEME, useResumeThemeStore } from '@/store/useResumeThemeStore';
import { Job } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconTextPlus, IconTrashX, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

export type ResumeExperienceFormValues = z.infer<typeof resumeExperienceFormSchema>;
type ResumeExperienceFormProps = {
	handleSubmit(values: ResumeExperienceFormValues): Promise<void>;
	afterResumeExperienceFormSubmit(): void;
	handleDeleteSection(): Promise<void>;
	submitResponse: Either<string, string> | undefined;
	defaultValues: DefaultResumeExperience;
	resumeId: string;
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
	handleDeleteSection,
	submitResponse,
	defaultValues,
	resumeId,
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
		form.reset({ ...defaultValues, error: null });
	}, [resumeId]);

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

	const handleAppendExperience = (value: Omit<Job, 'id'>) => {
		append(value);
		debounced();
	};

	const handleRemoveExperience = (index: number) => {
		remove(index);
		debounced();
	};

	return (
		<Form {...form}>
			<form
				onChange={debounced}
				onMouseEnter={() => setIsFocused(true)}
				onMouseLeave={() => setIsFocused(false)}
				className="relative flex flex-col w-full hover:bg-zinc-100/50 duration-200 pl-5">
				{isFocused && (
					<ButtonTooltip
						id="remove-experience"
						className="absolute top-2 right-12"
						side="left"
						label="Remove section"
						onClick={handleDeleteSection}>
						<IconTrashX size={16} className="text-zinc-400 group-hover:text-zinc-600" />
					</ButtonTooltip>
				)}
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
				<div className="flex flex-col gap-2 w-full">
					{isFocused && (
						<ButtonTooltip
							id="add-experience"
							onClick={() => handleAppendExperience(defaultJob)}
							side="right"
							label="Add experience"
							className="absolute right-2 top-2">
							<IconTextPlus size={16} className="text-zinc-400 group-hover:text-zinc-600" />
						</ButtonTooltip>
					)}
					{fields.map((field, index) => (
						<article
							data-testid={`experience-${index}`}
							key={field.id}
							className="relative w-full flex flex-col gap-0">
							{isFocused && (
								<Button
									data-testid={`remove-experience-${index}`}
									onClick={() => handleRemoveExperience(index)}
									className="group absolute -left-5 top-[0.65rem] rounded-full bg-transparent grid place-items-center p-[0.1rem] w-fit h-fit hover:bg-zinc-200">
									<IconX size={14} className="text-zinc-400 group-hover:text-zinc-900 duration-200" />
								</Button>
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
												rows={Math.floor(field.value.length / 60)}
												{...field}
												{...form.register(`jobList.${index}.description`)}
												className={cn(
													!isFocused && 'resize-none ',
													theme === RESUME_THEME.DEFAULT &&
														'text-sm text-zinc-500 h-full text-pretty -mt-1'
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
