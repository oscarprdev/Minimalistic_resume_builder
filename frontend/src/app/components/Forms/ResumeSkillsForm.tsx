import ViewerSkillIcon from '../Icons/SkillsIcons';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/components/ui/form';
import { Input } from '@/app/components/ui/input';
import ButtonTooltip from '@/app/containers/ButtonTooltip';
import { defaultSkill } from '@/data/default-resume';
import { DefaultResumeSkills } from '@/data/default-resume.types';
import { Either, isError } from '@/lib/types';
import { cn } from '@/lib/utils';
import { RESUME_THEME, useResumeThemeStore } from '@/store/useResumeThemeStore';
import { Skill } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconTextPlus, IconTrashX, IconX } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';

export type ResumeSkillsFormValues = z.infer<typeof resumeSkillsFormSchema>;
type ResumeSkillsFormProps = {
	handleSubmit(values: ResumeSkillsFormValues): Promise<void>;
	afterResumeSkillsFormSubmit(): void;
	handleDeleteSection(): Promise<void>;
	submitResponse: Either<string, string> | undefined;
	defaultValues: DefaultResumeSkills;
	resumeId: string;
};

const resumeSkillsFormSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	skillList: z.array(
		z.object({
			id: z.string(),
			name: z.string(),
		})
	),
	isHidden: z.boolean(),
	error: z.union([z.string(), z.null()]),
});

const ResumeSkillsForm = ({
	handleSubmit,
	afterResumeSkillsFormSubmit,
	handleDeleteSection,
	submitResponse,
	defaultValues,
	resumeId,
}: ResumeSkillsFormProps) => {
	const [isFocused, setIsFocused] = useState(false);

	const { theme } = useResumeThemeStore();

	const form = useForm<ResumeSkillsFormValues>({
		resolver: zodResolver(resumeSkillsFormSchema),
		defaultValues: { ...defaultValues, error: null },
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'skillList' as never,
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
				afterResumeSkillsFormSubmit();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submitResponse]);

	const handleAppendSkill = (value: Omit<Skill, 'id'>) => {
		append(value);
		debounced();
	};

	const handleRemoveSkill = (index: number) => {
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
						id="remove-skills"
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
				<div className="flex items-center justify-start flex-wrap gap-2 w-full pt-3">
					{isFocused && (
						<ButtonTooltip
							id="add-skill"
							onClick={() => handleAppendSkill(defaultSkill)}
							side="right"
							label="Add skill"
							className="absolute top-2 right-2">
							<IconTextPlus size={16} className="text-zinc-400 group-hover:text-zinc-600" />
						</ButtonTooltip>
					)}
					{fields.map((field, index) => (
						<article data-testid={`skill-${index}`} key={field.id} className="relative flex flex-col gap-0">
							{isFocused && (
								<Button
									data-testid={`remove-skill-${index}`}
									onClick={() => handleRemoveSkill(index)}
									className="group absolute -top-1 -left-1 rounded-full bg-zinc-200/50 border grid place-items-center p-[0.1rem] w-fit h-fit hover:bg-zinc-200">
									<IconX size={14} className="text-zinc-400 group-hover:text-zinc-900 duration-200" />
								</Button>
							)}
							<FormField
								control={form.control}
								name={`skillList.${index}.name`}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="flex items-center justify-between gap-1 px-2 -py-1 rounded-md bg-zinc-200/50">
												<ViewerSkillIcon value={field.value} />
												<Input
													{...field}
													{...form.register(`skillList.${index}.name`)}
													className={cn(
														field.value.length > 6 && '-mr-2',
														theme === RESUME_THEME.DEFAULT &&
															'text-zinc-700 text-xs leading-tight h-fit py-2 w-fit min-w-[25px]'
													)}
													kind={'dynamic'}
													variant={'resume'}
													required
												/>
											</div>
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

export default ResumeSkillsForm;
