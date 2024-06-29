'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormLanguagesList from './AsideFormLanguagesList';
import { ResumeLanguagesDefaultValues } from '@/store/useResumeLanguagesStore';
import { FormLanguagesValues, asideFormLanguagesSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';
import FormContainer from '../shared/components/FormContainer';

interface AsideFormLanguagesPresentationProps {
	defaultValues?: ResumeLanguagesDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	isUserLogged?: boolean;
	onSubmit: (values: FormLanguagesValues) => Promise<void>;
	onDestructiveClick: () => void;
}

const AsideFormLanguagesPresentation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	isUserLogged,
	onSubmit,
	onDestructiveClick,
}: AsideFormLanguagesPresentationProps) => {
	const form = useDynamicForm<ResumeLanguagesDefaultValues>({ schema: asideFormLanguagesSchema, defaultValues });

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
		</FormContainer>
	);
};

export default AsideFormLanguagesPresentation;
