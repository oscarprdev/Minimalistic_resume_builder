import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import ButtonTooltip from '@/app/containers/ButtonTooltip';
import { defaultSchool } from '@/data/default-resume';
import { DefaultResumeEducation } from '@/data/default-resume.types';
import { Either, isError } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RESUME_THEME, useResumeThemeStore } from '@/store/useResumeThemeStore';
import { School } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconTextPlus, IconTrashX, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

export type ResumeEducationFormValues = z.infer<typeof resumeEducationFormSchema>;
type ResumeEducationFormProps = {
	handleSubmit(values: ResumeEducationFormValues): Promise<void>;
	afterResumeEducationFormSubmit(): void;
	handleDeleteSection(): Promise<void>;
	submitResponse: Either<string, string> | undefined;
	defaultValues: DefaultResumeEducation;
	resumeId: string
};

const resumeEducationFormSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	educationList: z.array(
		z.object({
			id: z.string(),
			title: z.string(),
			career: z.string(),
			description: z.string(),
			dates: z.string(),
		})
	),
	isHidden: z.boolean(),
	error: z.union([z.string(), z.null()]),
});

const ResumeEducationForm = ({
	handleSubmit,
	afterResumeEducationFormSubmit,
	handleDeleteSection,
	submitResponse,
	defaultValues,
	resumeId
}: ResumeEducationFormProps) => {
	const [isFocused, setIsFocused] = useState(false);

	const { theme } = useResumeThemeStore();

	const form = useForm<ResumeEducationFormValues>({
		resolver: zodResolver(resumeEducationFormSchema),
		defaultValues: { ...defaultValues, error: null },
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'educationList' as never,
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
				afterResumeEducationFormSubmit();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitResponse]);

	const handleAppendEducation = (value: Omit<School, 'id'>) => {
		append(value);
		debounced();
	};

	const handleRemoveEducation = (index: number) => {
		remove(index);
		debounced();
	};

	return (
		<Form {...form}>
			<form
				onChange={debounced}
				onMouseEnter={() => setIsFocused(true)}
				onMouseLeave={() => setIsFocused(false)}
				className="relative flex flex-col w-full hover:bg-zinc-100/50 duration-200 pl-5 pb-1">
				{isFocused && (
					<ButtonTooltip
						id="remove-education"
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
				<div className="flex flex-col gap-0 w-full">
					{isFocused && (
						<ButtonTooltip
							id="add-education"
							onClick={() => handleAppendEducation(defaultSchool)}
							side="right"
							label="Add education"
							className="absolute right-2 top-2">
							<IconTextPlus size={16} className="text-zinc-400 group-hover:text-zinc-600" />
						</ButtonTooltip>
					)}
					{fields.map((field, index) => (
						<article
							data-testid={`education-${index}`}
							key={field.id}
							className="relative w-full flex flex-col gap-0">
							{isFocused && (
								<Button
									data-testid={`remove-education-${index}`}
									onClick={() => handleRemoveEducation(index)}
									className="group absolute -left-5 top-[0.65rem] rounded-full bg-transparent grid place-items-center p-[0.1rem] w-fit h-fit hover:bg-zinc-200">
									<IconX size={14} className="text-zinc-400 group-hover:text-zinc-900 duration-200" />
								</Button>
							)}
							<FormField
								control={form.control}
								name={`educationList.${index}.title`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`educationList.${index}.title`)}
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
								name={`educationList.${index}.dates`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`educationList.${index}.dates`)}
												className={cn(
													theme === RESUME_THEME.DEFAULT &&
														'text-md w-[350px] text-zinc-700 text-xs text-right absolute top-0 right-5'
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
								name={`educationList.${index}.career`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`educationList.${index}.career`)}
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

export default ResumeEducationForm;
