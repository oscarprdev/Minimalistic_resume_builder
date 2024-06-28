'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormExperienceJobList from './AsideFormExperienceJobList';
import { ResumeExperienceDefaultValues } from '@/store/useResumeExperienceStore';
import { FormExperienceValues, asideFormExperienceSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';

interface AsideFormExperiencePresentationProps {
	defaultValues?: ResumeExperienceDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	onSubmit: (values: FormExperienceValues) => Promise<void>;
	onDestructiveClick: () => void;
}

export type ExperienceFormState = ResumeExperienceDefaultValues;

const AsideFormExperiencePresentation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	onSubmit,
	onDestructiveClick,
}: AsideFormExperiencePresentationProps) => {
	const form = useDynamicForm<ExperienceFormState>({ schema: asideFormExperienceSchema, defaultValues });

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
							<FormLabel className='text-sm text-gray-500'>Experience title</FormLabel>
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
				<AsideFormExperienceJobList form={form} />
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

export default AsideFormExperiencePresentation;
