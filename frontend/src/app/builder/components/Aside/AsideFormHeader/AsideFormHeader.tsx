'use client';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { useRouterAfterSubmit } from '@/hooks/use-router-after-submit';
import { Either, isLeft } from '@/lib/either';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResumeHeaderDefaultValues } from '@/store/useResumeHeaderStore';
import AsideFormHeaderImage, { DEFAULT_IMAGE, MAX_FILE_SIZE_MB } from './AsideFormHeaderImage';
import { ChangeEvent } from 'react';
import { toast } from '@/components/ui/use-toast';
import SectionActions from '../shared/components/SectionActions';
import AsideFormHeaderLinks from './AsideFormHeaderLinks';

interface AsideFormHeaderProps {
	defaultValues?: ResumeHeaderDefaultValues;
	handleSubmit: (values: z.infer<typeof asideFormHeaderSchema>) => Promise<Either<string, string>>;
	updateImage: (formData: FormData) => Promise<Either<string, string>>;
	removeImage: () => Promise<Either<string, string>>;
}

export const asideFormHeaderSchema = z.object({
	name: z.string(),
	job: z.string(),
	location: z.string(),
	email: z.string(),
	phone: z.string(),
	links: z.array(z.string()),
	image: z.string().optional(),
});

const AsideFormHeader = ({ defaultValues, handleSubmit, updateImage, removeImage }: AsideFormHeaderProps) => {
	const router = useRouter();
	const params = useSearchParams();
	const routerAfterSubmit = useRouterAfterSubmit(router, params);

	const form = useForm<z.infer<typeof asideFormHeaderSchema>>({
		resolver: zodResolver(asideFormHeaderSchema),
		defaultValues,
	});

	const onSubmit = async (values: z.infer<typeof asideFormHeaderSchema>) => {
		const response = await handleSubmit(values);

		routerAfterSubmit(response);
	};

	const updateFormImageValue = async (e: ChangeEvent) => {
		if (e.target instanceof HTMLInputElement) {
			const [file] = Array.from(e.target.files!);
			if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
				toast({
					description: `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`,
					variant: 'destructive',
				});
				return;
			}

			const formData = new FormData();
			formData.append('image', file, file?.type);

			const response = await updateImage(formData);
			if (isLeft(response)) {
				toast({
					description: response.left,
					variant: 'destructive',
				});
				return;
			}

			form.setValue('image', response.right);
		}
	};

	const removeFormImageValue = async () => {
		const response = await removeImage();
		if (isLeft(response)) {
			toast({
				description: response.left,
				variant: 'destructive',
			});
			return;
		}

		form.setValue('image', DEFAULT_IMAGE);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-6'>
				<AsideFormHeaderImage
					form={form}
					updateFormImageValue={updateFormImageValue}
					removeFormImageValue={removeFormImageValue}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Name</FormLabel>
							<FormControl>
								<Input
									placeholder='Name'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='job'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Current Job</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Job'
									className='min-h-[80px]'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Location</FormLabel>
							<FormControl>
								<Input
									placeholder='Location'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='phone'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Phone</FormLabel>
							<FormControl>
								<Input
									placeholder='Phone'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<AsideFormHeaderLinks form={form} />
				<SectionActions loading={form.formState.isSubmitting} />
			</form>
		</Form>
	);
};

export default AsideFormHeader;
