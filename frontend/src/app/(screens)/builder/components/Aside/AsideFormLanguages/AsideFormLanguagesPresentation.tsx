'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormLanguagesList from './AsideFormLanguagesList';
import { ResumeLanguagesDefaultValues } from '@/store/useResumeLanguagesStore';
import { FormLanguagesValues, asideFormLanguagesSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';

interface AsideFormLanguagesPresenationProps {
	defaultValues?: ResumeLanguagesDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	onSubmit: (values: FormLanguagesValues) => Promise<void>;
	onDestructiveClick: () => void;
}

const AsideFormLanguagesPresenation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	onSubmit,
	onDestructiveClick,
}: AsideFormLanguagesPresenationProps) => {
	const form = useDynamicForm<ResumeLanguagesDefaultValues>({ schema: asideFormLanguagesSchema, defaultValues });

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
							<FormLabel className='text-sm text-gray-500'>Languages title</FormLabel>
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
				<AsideFormLanguagesList form={form} />
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

export default AsideFormLanguagesPresenation;
