'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeHeaderDefaultValues } from '@/store/useResumeHeaderStore';
import AsideFormHeaderImage, { DEFAULT_IMAGE, MAX_FILE_SIZE_MB } from './AsideFormHeaderImage';
import { ChangeEvent } from 'react';
import SectionActions from '../shared/components/SectionActions';
import AsideFormHeaderLinks from './AsideFormHeaderLinks';
import { useDynamicForm } from '@/hooks/useDynamicForm';
import { FormHeaderValues, asideFormHeaderSchema } from './schema-validations';
import { toast } from '@/components/ui/use-toast';
import { Either, isLeft } from '@/lib/either';

interface AsideFormHeaderPresentationProps {
	defaultValues?: ResumeHeaderDefaultValues;
	isDestructiveCtaDisabled: boolean;
	isDeleteCtaPending: boolean;
	onSubmit: (values: FormHeaderValues) => Promise<void>;
	onDestructiveClick: () => void;
	updateImage: (formData: FormData) => Promise<Either<string, string>>;
	removeImage: () => Promise<Either<string, string>>;
}

const AsideFormHeaderPresentation = ({
	defaultValues,
	isDestructiveCtaDisabled,
	isDeleteCtaPending,
	onSubmit,
	onDestructiveClick,
	updateImage,
	removeImage,
}: AsideFormHeaderPresentationProps) => {
	const form = useDynamicForm<ResumeHeaderDefaultValues>({ schema: asideFormHeaderSchema, defaultValues });

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
				className='space-y-6 animate-fade-up'>
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
									required
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
									required
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
									required
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
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel className='text-sm text-gray-500'>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Email'
									required
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<AsideFormHeaderLinks form={form} />
				<SectionActions
					loading={form.formState.isSubmitting}
					isDestructiveCtaDisabled={isDestructiveCtaDisabled}
					isDeleteCtaPending={isDeleteCtaPending}
					onDestructiveClick={onDestructiveClick}
				/>
			</form>
		</Form>
	);
};

export default AsideFormHeaderPresentation;
