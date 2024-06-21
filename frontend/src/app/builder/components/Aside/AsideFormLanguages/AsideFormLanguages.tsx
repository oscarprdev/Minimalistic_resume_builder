'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import AsideFormLanguagesList from './AsideFormLanguagesList';
import { ResumeLanguagesDefaultValues } from '@/store/useResumeLanguagesStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/use-router-after-submit';
import { useSearchParams, useRouter } from 'next/navigation';
import { asideFormLanguagesSchema } from './schema-validations';
import SectionActions from '../shared/components/SectionActions';

interface AsideFormLanguagesProps {
	handleSubmit: (values: z.infer<typeof asideFormLanguagesSchema>) => Promise<Either<string, string>>;
	defaultValues?: ResumeLanguagesDefaultValues;
}

export type LanguagesFormState = ResumeLanguagesDefaultValues;

const AsideFormLanguages = ({ defaultValues, handleSubmit }: AsideFormLanguagesProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const form = useForm<z.infer<typeof asideFormLanguagesSchema>>({
		resolver: zodResolver(asideFormLanguagesSchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof asideFormLanguagesSchema>) => {
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
				<SectionActions loading={form.formState.isSubmitting} />
			</form>
		</Form>
	);
};

export default AsideFormLanguages;
