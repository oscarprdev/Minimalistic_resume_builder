'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormEducationList from './AsideFormEducationList';
import { ResumeEducationDefaultValues } from '@/store/useResumeEducationStore';
import { FormEducationValues, asideFormEducationSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';

interface AsideFormEducationPresentationProps {
	defaultValues?: ResumeEducationDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	onSubmit: (values: FormEducationValues) => Promise<void>;
	onDestructiveClick: () => void;
}

export type EducationFormState = ResumeEducationDefaultValues;

const AsideFormEducationPresentation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	onSubmit,
	onDestructiveClick,
}: AsideFormEducationPresentationProps) => {
	const form = useDynamicForm<EducationFormState>({ schema: asideFormEducationSchema, defaultValues });

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
							<FormLabel className='text-sm text-gray-500'>Education title</FormLabel>
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
				<AsideFormEducationList form={form} />
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

export default AsideFormEducationPresentation;
