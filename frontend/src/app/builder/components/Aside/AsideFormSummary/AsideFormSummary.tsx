'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IconLoader2 } from '@tabler/icons-react';
import { Textarea } from '@/components/ui/textarea';
import { ResumeSummaryDefaultValues } from '@/store/useResumeSummaryStore';
import { useRouterAfterSubmit } from '@/hooks/use-router-after-submit';
import { Either } from '@/lib/either';
import { useSearchParams, useRouter } from 'next/navigation';

interface AsideFormSummaryProps {
	defaultValues: ResumeSummaryDefaultValues;
	handleSubmit: (values: z.infer<typeof asideFormSummarySchema>) => Promise<Either<string, string>>;
}

export const asideFormSummarySchema = z.object({
	title: z.string().min(5, {
		message: 'Title must be at least 5 characters.',
	}),
	summary: z.string().max(200, {
		message: 'Summary must be less than 200 characters.',
	}),
});

const AsideFormSummary = ({ defaultValues, handleSubmit }: AsideFormSummaryProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const form = useForm<z.infer<typeof asideFormSummarySchema>>({
		resolver: zodResolver(asideFormSummarySchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof asideFormSummarySchema>) => {
		const response = await handleSubmit(values);

		routerAfterSubmit(response);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8'>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Summary title</FormLabel>
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
				<FormField
					control={form.control}
					name='summary'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Summary description</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Description'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>{form.formState.isSubmitting ? <IconLoader2 className='animate-spin text-white' /> : 'Update'}</Button>
			</form>
		</Form>
	);
};

export default AsideFormSummary;
