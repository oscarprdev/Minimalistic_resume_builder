'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { IconLoader2 } from '@tabler/icons-react';
import { ResumeInfoDefaultValues } from '@/store/useResumeInfoStore';
import { Either } from '@/lib/either';
import { useRouterAfterSubmit } from '@/hooks/use-router-after-submit';
import { useSearchParams, useRouter } from 'next/navigation';

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

	const form = useForm<z.infer<typeof asideFormInfoSchema>>({
		resolver: zodResolver(asideFormInfoSchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof asideFormInfoSchema>) => {
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
							<FormLabel className='text-sm text-gray-500'>Resume title</FormLabel>
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
				<Button type='submit'>{form.formState.isSubmitting ? <IconLoader2 className='animate-spin text-white' /> : 'Update'}</Button>
			</form>
		</Form>
	);
};

export default AsideFormInfo;
