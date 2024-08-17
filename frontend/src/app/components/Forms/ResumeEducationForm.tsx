import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { DefaultResumeEducation } from '@/data/default-resume.types';
import { Either, isError } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RESUME_THEME, useResumeThemeStore } from '@/store/useResumeThemeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

export type ResumeEducationFormValues = z.infer<typeof resumeEducationFormSchema>;
type ResumeEducationFormProps = {
	handleSubmit(values: ResumeEducationFormValues): Promise<void>;
	afterResumeEducationFormSubmit(): void;
	submitResponse: Either<string, string> | undefined;
	defaultValues: DefaultResumeEducation;
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
	submitResponse,
	defaultValues,
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
		if (submitResponse) {
			if (isError(submitResponse)) {
				return form.setValue('error', submitResponse.error);
			} else {
				afterResumeEducationFormSubmit();
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
									kind="title"
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
				<div className="relative flex flex-col gap-0 w-full">
					{fields.map((field, index) => (
						<article key={field.id} className="relative w-full flex flex-col gap-0">
							<FormField
								control={form.control}
								name={`educationList.${index}.title`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`educationList.${index}.title`)}
												kind="title"
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
								name={`educationList.${index}.career`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`educationList.${index}.career`)}
												kind="title"
												className={cn(
													theme === RESUME_THEME.DEFAULT &&
														'text-md text-zinc-800 w-fit text-sm -mt-4'
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
								name={`educationList.${index}.description`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												{...field}
												{...form.register(`educationList.${index}.description`)}
												className={cn(
													!isFocused && 'resize-none ',
													theme === RESUME_THEME.DEFAULT &&
														'text-sm text-zinc-500 min-h-[70px] text-pretty'
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
