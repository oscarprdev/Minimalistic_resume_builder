'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ResumeInfoDefaultValues } from '@/store/useResumeInfoStore';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';
import { FormInfoValues, asideFormInfoSchema } from './schema-validations';

interface AsideFormInfoPresentationProps {
	defaultValues?: ResumeInfoDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	onSubmit: (values: FormInfoValues) => Promise<void>;
	onDestructiveClick: () => void;
}

const AsideFormInfoPresentation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	onSubmit,
	onDestructiveClick,
}: AsideFormInfoPresentationProps) => {
	const form = useDynamicForm<ResumeInfoDefaultValues>({ schema: asideFormInfoSchema, defaultValues });

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
							<FormLabel className='text-sm text-gray-500'>Resume title</FormLabel>
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
				<SectionActions
					loading={form.formState.isSubmitting}
					destructiveLabel='Delete resume'
					onDestructiveClick={onDestructiveClick}
					isDeleteCtaPending={isDeleteCtaPending}
					isDestructiveCtaDisabled={isDestructiveCtaDisabled}
				/>
			</form>
		</Form>
	);
};

export default AsideFormInfoPresentation;
