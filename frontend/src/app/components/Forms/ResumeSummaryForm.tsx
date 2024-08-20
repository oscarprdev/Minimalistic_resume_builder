import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import ButtonTooltip from '@/app/containers/ButtonTooltip';
import { DefaultResumeSummary } from '@/data/default-resume.types';
import { Either, isError } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RESUME_THEME, useResumeThemeStore } from '@/store/useResumeThemeStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconTrashX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

export type ResumeSummaryFormValues = z.infer<typeof resumeSummaryFormSchema>;
type ResumeSummaryFormProps = {
	handleSubmit(values: ResumeSummaryFormValues): Promise<void>;
	afterResumeSummaryFormSubmit(): void;
	handleDeleteSection(): Promise<void>;
	submitResponse: Either<string, string> | undefined;
	defaultValues: DefaultResumeSummary;
	resumeId: string;
};

const resumeSummaryFormSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	summary: z.string(),
	isHidden: z.boolean(),
	error: z.union([z.string(), z.null()]),
});

const ResumeSummaryForm = ({
	handleSubmit,
	afterResumeSummaryFormSubmit,
	handleDeleteSection,
	submitResponse,
	defaultValues,
	resumeId,
}: ResumeSummaryFormProps) => {
	const [isFocused, setIsFocused] = useState(false);

	const { theme } = useResumeThemeStore();

	const form = useForm<ResumeSummaryFormValues>({
		resolver: zodResolver(resumeSummaryFormSchema),
		defaultValues: { ...defaultValues, error: null },
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
				afterResumeSummaryFormSubmit();
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
				{isFocused && (
					<ButtonTooltip
						id="remove-summary"
						className="absolute top-2 right-2"
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
				<FormField
					control={form.control}
					name="summary"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									rows={Math.floor(field.value.length / 50)}
									className={cn(
										!isFocused && 'resize-none ',
										theme === RESUME_THEME.DEFAULT &&
											'text-sm text-zinc-700 mt-1 h-full text-pretty'
									)}
									variant={'resume'}
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

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

export default ResumeSummaryForm;
