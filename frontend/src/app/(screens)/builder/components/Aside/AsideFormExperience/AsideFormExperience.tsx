'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormExperienceJobList from './AsideFormExperienceJobList';
import { ResumeExperienceDefaultValues } from '@/store/useResumeExperienceStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import { asideFormExperienceSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';

interface AsideFormExperienceProps {
	handleSubmit: (values: z.infer<typeof asideFormExperienceSchema>) => Promise<Either<string, string>>;
	defaultValues?: ResumeExperienceDefaultValues;
}

export type ExperienceFormState = ResumeExperienceDefaultValues;

const AsideFormExperience = ({ defaultValues, handleSubmit }: AsideFormExperienceProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const form = useDynamicForm<ExperienceFormState>({ schema: asideFormExperienceSchema, defaultValues });

	const onSubmit = async (values: z.infer<typeof asideFormExperienceSchema>) => {
		const response = await handleSubmit(values);
		routerAfterSubmit(response);
	};

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
				<SectionActions loading={form.formState.isSubmitting} />
			</form>
		</Form>
	);
};

export default AsideFormExperience;
