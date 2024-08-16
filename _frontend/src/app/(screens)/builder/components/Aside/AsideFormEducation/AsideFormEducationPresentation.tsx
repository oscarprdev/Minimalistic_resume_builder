'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormEducationList from './AsideFormEducationList';
import { ResumeEducationDefaultValues } from '@/store/useResumeEducationStore';
import { FormEducationValues, asideFormEducationSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';
import FormContainer from '../shared/components/FormContainer';

interface AsideFormEducationPresentationProps {
	defaultValues?: ResumeEducationDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	userId?: string;
	onSubmit: (values: FormEducationValues) => Promise<void>;
	onDestructiveClick: () => void;
}

const AsideFormEducationPresentation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	userId,
	onSubmit,
	onDestructiveClick,
}: AsideFormEducationPresentationProps) => {
	const form = useDynamicForm<ResumeEducationDefaultValues>({ schema: asideFormEducationSchema, defaultValues });

	return (
		<FormContainer
			form={form}
			userId={userId}
			onSubmit={onSubmit}>
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
		</FormContainer>
	);
};

export default AsideFormEducationPresentation;
