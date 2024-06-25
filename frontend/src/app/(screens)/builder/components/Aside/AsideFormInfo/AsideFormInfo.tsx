'use client';

import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResumeInfoDefaultValues } from '@/store/useResumeInfoStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/useRouterAfterSubmit';
import { useSearchParams, useRouter } from 'next/navigation';
import SectionActions from '../shared/components/SectionActions';
import { useEffect } from 'react';
import { useDynamicForm } from '@/hooks/useDynamicForm';

interface AsideFormInfoProps {
	defaultValues?: ResumeInfoDefaultValues;
	handleSubmit: (values: z.infer<typeof asideFormInfoSchema>) => Promise<Either<string, string>>;
}

export const asideFormInfoSchema = z.object({
	title: z.string().min(5, {
		message: 'Title must be at least 5 characters.',
	}),
});

const AsideFormInfo = ({ defaultValues, handleSubmit }: AsideFormInfoProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const form = useDynamicForm<ResumeInfoDefaultValues>({ schema: asideFormInfoSchema, defaultValues });

	const onSubmit = async (values: z.infer<typeof asideFormInfoSchema>) => {
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
				<SectionActions loading={form.formState.isSubmitting} />
			</form>
		</Form>
	);
};

export default AsideFormInfo;
