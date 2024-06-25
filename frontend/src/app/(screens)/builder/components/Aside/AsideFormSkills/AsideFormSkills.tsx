'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsideFormSkillsList from './AsideFormSkillsList';
import { ResumeSkillsDefaultValues } from '@/store/useResumeSkillsStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import { asideFormSkillsSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';
import { useDynamicForm } from '@/hooks/useDynamicForm';

interface AsideFormSkillsProps {
	handleSubmit: (values: z.infer<typeof asideFormSkillsSchema>) => Promise<Either<string, string>>;
	defaultValues?: ResumeSkillsDefaultValues;
}

export type SkillsFormState = ResumeSkillsDefaultValues;

const AsideFormSkills = ({ defaultValues, handleSubmit }: AsideFormSkillsProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const form = useDynamicForm<SkillsFormState>({ schema: asideFormSkillsSchema, defaultValues });

	const onSubmit = async (values: z.infer<typeof asideFormSkillsSchema>) => {
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
				<SectionActions loading={form.formState.isSubmitting} />
			</form>
		</Form>
	);
};

export default AsideFormSkills;
