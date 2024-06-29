'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormSkillsList from './AsideFormSkillsList';
import { ResumeSkillsDefaultValues } from '@/store/useResumeSkillsStore';
import { FormSkillsValues, asideFormSkillsSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';
import FormContainer from '../shared/components/FormContainer';

interface AsideFormSkillsPresentationProps {
	defaultValues?: ResumeSkillsDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	isUserLogged?: boolean;
	onSubmit: (values: FormSkillsValues) => Promise<void>;
	onDestructiveClick: () => void;
}

const AsideFormSkillsPresentation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	isUserLogged,
	onSubmit,
	onDestructiveClick,
}: AsideFormSkillsPresentationProps) => {
	const form = useDynamicForm<ResumeSkillsDefaultValues>({ schema: asideFormSkillsSchema, defaultValues });

	return (
		<FormContainer
			form={form}
			isUserLogged={isUserLogged}
			onSubmit={onSubmit}>
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
		</FormContainer>
	);
};

export default AsideFormSkillsPresentation;
