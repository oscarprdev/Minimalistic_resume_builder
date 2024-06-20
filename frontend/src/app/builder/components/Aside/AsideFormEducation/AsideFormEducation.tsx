'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import AsideFormEducationList from './AsideFormEducationList';
import { ResumeEducationDefaultValues } from '@/store/useResumeEducationStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/use-router-after-submit';
import { useSearchParams, useRouter } from 'next/navigation';
import { asideFormEducationSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';

interface AsideFormEducationProps {
	handleSubmit: (values: z.infer<typeof asideFormEducationSchema>) => Promise<Either<string, string>>;
	defaultValues?: ResumeEducationDefaultValues;
}

export type EducationFormState = ResumeEducationDefaultValues;

const AsideFormEducation = ({ defaultValues, handleSubmit }: AsideFormEducationProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const form = useForm<z.infer<typeof asideFormEducationSchema>>({
		resolver: zodResolver(asideFormEducationSchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof asideFormEducationSchema>) => {
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
							<FormLabel className='text-sm text-gray-500'>Education title</FormLabel>
							<FormControl>
								<Input
									placeholder='Title'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<AsideFormEducationList form={form} />
				<SectionActions loading={form.formState.isSubmitting} />
			</form>
		</Form>
	);
};

export default AsideFormEducation;
