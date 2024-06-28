'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeSummaryDefaultValues } from '@/store/useResumeSummaryStore';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';
import { FormSummaryValues, asideFormSummarySchema } from './schema-validations';

interface AsideFormSummaryPresentationProps {
	defaultValues?: ResumeSummaryDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	onSubmit: (values: FormSummaryValues) => Promise<void>;
	onDestructiveClick: () => void;
}

const AsideFormSummaryPresentation = ({
	defaultValues,
	isDeleteCtaPending,
	isDestructiveCtaDisabled,
	onSubmit,
	onDestructiveClick,
}: AsideFormSummaryPresentationProps) => {
	const form = useDynamicForm<ResumeSummaryDefaultValues>({ schema: asideFormSummarySchema, defaultValues });

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
							<FormLabel className='text-sm text-gray-500'>Summary title</FormLabel>
							<FormControl>
								<Input
									required
									placeholder='Title'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='summary'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Summary description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Description'
									className='min-h-[150px]'
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<SectionActions
					loading={form.formState.isSubmitting}
					destructiveLabel='Clear summary'
					onDestructiveClick={onDestructiveClick}
					isDeleteCtaPending={isDeleteCtaPending}
					isDestructiveCtaDisabled={isDestructiveCtaDisabled}
				/>
			</form>
		</Form>
	);
};

export default AsideFormSummaryPresentation;
