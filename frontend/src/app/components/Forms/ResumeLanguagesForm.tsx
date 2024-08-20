import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import ButtonTooltip from '@/app/containers/ButtonTooltip';
import { defaultLanguage } from '@/data/default-resume';
import { DefaultResumeLanguages } from '@/data/default-resume.types';
import { Either, isError } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RESUME_THEME, useResumeThemeStore } from '@/store/useResumeThemeStore';
import { Language } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconTextPlus, IconTrashX, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

export type ResumeLanguagesFormValues = z.infer<typeof resumeLanguagesFormSchema>;
type ResumeLanguagesFormProps = {
	handleSubmit(values: ResumeLanguagesFormValues): Promise<void>;
	afterResumeLanguagesFormSubmit(): void;
	handleDeleteSection(): Promise<void>;
	submitResponse: Either<string, string> | undefined;
	defaultValues: DefaultResumeLanguages;
	resumeId: string;
};

const resumeLanguagesFormSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	languageList: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
			level: z.string(),
			certificateLink: z.string().optional(),
		})
	),
	isHidden: z.boolean(),
	error: z.union([z.string(), z.null()]),
});

const ResumeLanguagesForm = ({
	handleSubmit,
	afterResumeLanguagesFormSubmit,
	handleDeleteSection,
	submitResponse,
	defaultValues,
	resumeId,
}: ResumeLanguagesFormProps) => {
	const [isFocused, setIsFocused] = useState(false);

	const { theme } = useResumeThemeStore();

	const form = useForm<ResumeLanguagesFormValues>({
		resolver: zodResolver(resumeLanguagesFormSchema),
		defaultValues: { ...defaultValues, error: null },
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'languageList' as never,
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
				afterResumeLanguagesFormSubmit();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitResponse]);

	const handleAppendLanguage = (value: Omit<Language, 'id'>) => {
		append(value);
		debounced();
	};

	const handleRemoveLanguage = (index: number) => {
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
						id="remove-languages"
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
				<div className="flex items-center justify-start flex-wrap gap-0 w-full">
					{isFocused && (
						<ButtonTooltip
							id="add-language"
							onClick={() => handleAppendLanguage(defaultLanguage)}
							side="right"
							label="Add language"
							className="absolute top-2 right-2">
							<IconTextPlus size={16} className="text-zinc-400 group-hover:text-zinc-600" />
						</ButtonTooltip>
					)}
					{fields.map((field, index) => (
						<article
							data-testid={`language-${index}`}
							key={field.id}
							className="relative flex flex-col gap-0">
							{isFocused && (
								<Button
									data-testid={`remove-language-${index}`}
									onClick={() => handleRemoveLanguage(index)}
									className="group absolute -left-5 top-[0.65rem] rounded-full bg-transparent grid place-items-center p-[0.1rem] w-fit h-fit hover:bg-zinc-200">
									<IconX size={14} className="text-zinc-400 group-hover:text-zinc-900 duration-200" />
								</Button>
							)}
							<FormField
								control={form.control}
								name={`languageList.${index}.name`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`languageList.${index}.name`)}
												className={cn(
													theme === RESUME_THEME.DEFAULT &&
														'text-zinc-700 text-sm font-bold w-[80px]'
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
								name={`languageList.${index}.level`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												{...field}
												{...form.register(`languageList.${index}.level`)}
												className={cn(
													theme === RESUME_THEME.DEFAULT &&
														'text-zinc-700 text-xs w-fit max-w-[40px] -mt-5'
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

export default ResumeLanguagesForm;
