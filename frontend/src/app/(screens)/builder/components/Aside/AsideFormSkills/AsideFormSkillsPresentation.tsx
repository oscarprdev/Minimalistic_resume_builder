'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormSkillsList from './AsideFormSkillsList';
import { ResumeSkillsDefaultValues } from '@/store/useResumeSkillsStore';
import { FormSkillsValues, asideFormSkillsSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';

interface AsideFormSkillsPresentationProps {
	defaultValues?: ResumeSkillsDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	onSubmit: (values: FormSkillsValues) => Promise<void>;
	onDestructiveClick: () => void;
}

const AsideFormSkillsPresentation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	onSubmit,
	onDestructiveClick,
}: AsideFormSkillsPresentationProps) => {
	const form = useDynamicForm<ResumeSkillsDefaultValues>({ schema: asideFormSkillsSchema, defaultValues });

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6 animate-fade-up'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Skills title</FormLabel>
							<FormControl>
								<Input
									placeholder='Title'
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<AsideFormSkillsList form={form} />
				<SectionActions
					loading={form.formState.isSubmitting}
					isDestructiveCtaDisabled={isDestructiveCtaDisabled}
					isDeleteCtaPending={isDeleteCtaPending}
					onDestructiveClick={onDestructiveClick}
				/>
			</form>
		</Form>
	);
};

export default AsideFormSkillsPresentation;
